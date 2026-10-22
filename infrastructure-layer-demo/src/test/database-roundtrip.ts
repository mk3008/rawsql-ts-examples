import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Client } from 'pg';
import { RawSQLTodoRepository } from '../infrastructure/rawsql-infrastructure';

async function main() {
    if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required for the real PostgreSQL check');
    const client = new Client({ connectionString: process.env.DATABASE_URL });
    const repository = new RawSQLTodoRepository();
    await client.connect();
    try {
        await client.query('begin');
        // Keep all DDL and seed data isolated and roll them back, even on failure.
        const schema = `rawsql_sample_validation_${process.pid}`;
        await client.query(`create schema "${schema}"`);
        await client.query(`set local search_path to "${schema}"`);
        await client.query(readFileSync(resolve(__dirname, '../../init-db.sql'), 'utf8'));

        const all = repository.buildSearchQuery({});
        const allRows = await client.query(all.formattedSql, all.params);
        assert.equal(allRows.rows[0].todo_array.length, 12);
        assert.equal(typeof allRows.rows[0].todo_array[0].createdAt, 'string');

        const filtered = repository.buildSearchQuery({ title: 'project', status: 'pending', priority: 'high' });
        const filteredRows = await client.query(filtered.formattedSql, filtered.params);
        assert.equal(filteredRows.rows[0].todo_array.length, 1);
        assert.equal(filteredRows.rows[0].todo_array[0].title, 'Complete project documentation');

        const detail = repository.generateFindByIdQuery('1');
        const detailRows = await client.query(detail.formattedSql, detail.params);
        assert.equal(detailRows.rows[0].todo.todo_id, 1);
        assert.equal(detailRows.rows[0].todo.category.name, 'Work');
        assert.equal(detailRows.rows[0].todo.comments.length, 3);
        assert.equal(detailRows.rows[0].todo.comments[0].content, 'Started working on the API documentation section');

        const missing = repository.generateFindByIdQuery('999999');
        assert.equal((await client.query(missing.formattedSql, missing.params)).rowCount, 0);

        const hostileTitle = "%' OR TRUE --";
        const hostile = repository.buildSearchQuery({ title: hostileTitle });
        assert.ok(!hostile.formattedSql.includes(hostileTitle));
        assert.deepEqual(hostile.params, [`%${hostileTitle}%`]);
        assert.equal((await client.query(hostile.formattedSql, hostile.params)).rows[0].todo_array, null);
        console.log('PostgreSQL list/detail JSON, filters, missing ID, and injection checks passed');
    } finally {
        await client.query('rollback');
        await client.end();
        await repository.close();
    }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
