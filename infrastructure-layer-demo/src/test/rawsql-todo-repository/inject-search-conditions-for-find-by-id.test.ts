import { afterAll, describe, expect, it } from 'vitest';
import { RawSQLTodoRepository } from '../../infrastructure/rawsql-infrastructure';

const repository = new RawSQLTodoRepository();
afterAll(() => repository.close());

describe('findById parameter boundaries', () => {
    it('keeps the ID bound through JSON CTE composition', () => {
        const result = repository.generateFindByIdQuery('456');
        expect(result.params).toEqual([456]);
        expect(result.formattedSql).not.toContain('456');
        expect(result.formattedSql).toContain('$1');
    });

    it.each(['1 OR 1=1', '1; DROP TABLE todo', '-1', '0', '', '9007199254740992'])(
        'rejects an invalid ID without truncating it: %s',
        (id) => expect(() => repository.generateFindByIdQuery(id)).toThrow('positive safe integer')
    );
});
