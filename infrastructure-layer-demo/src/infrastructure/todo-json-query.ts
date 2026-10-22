import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { SelectQueryParser, SimpleSelectQuery } from 'rawsql-ts';

const projections = {
    list: readFileSync(join(__dirname, 'sql', 'todo-list-json.sql'), 'utf8'),
    detail: readFileSync(join(__dirname, 'sql', 'todo-detail-json.sql'), 'utf8')
};

/** JSON DTO shapes belong to this sample's SQL, not physical schema metadata. */
export function buildTodoJsonQuery(
    baseQuery: SimpleSelectQuery,
    shape: 'list' | 'detail'
): SimpleSelectQuery {
    const query = SelectQueryParser.parse(projections[shape]).toSimpleQuery();
    // Reuse the AST so bound parameter values survive the CTE composition.
    const origin = query.withClause?.tables.find(table => table.getSourceAliasName() === 'origin_query');
    if (!origin) throw new Error('JSON projection must declare origin_query first');
    origin.query = baseQuery;
    return query;
}
