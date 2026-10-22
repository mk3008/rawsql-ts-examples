import assert from 'node:assert/strict';
import test from 'node:test';
import { SelectQueryParser, SqlFormatter } from 'rawsql-ts';

const cases = [
    ['mysql', 'select `user_id`, `name` from `users` where `active` = ?', [true]],
    ['postgres', 'select "user_id", "name" from "users" where "active" = $1', [true]],
    ['sqlserver', 'select [user_id], [name] from [users] where [active] = @active', { active: true }],
    ['sqlite', 'select "user_id", "name" from "users" where "active" = :active', { active: true }]
] as const;

for (const [preset, sql, parameters] of cases) {
    test(`${preset} preserves SQL identifiers and bound values`, () => {
        const query = SelectQueryParser.parse('select user_id, name from users where active = :active');
        query.setParameter('active', true);
        const result = new SqlFormatter({ preset }).format(query);
        assert.equal(result.formattedSql, sql);
        assert.deepEqual(result.params, parameters);
    });
}
