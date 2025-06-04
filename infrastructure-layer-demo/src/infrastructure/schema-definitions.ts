import { SchemaManager, TableDefinition } from 'rawsql-ts';

/**
 * Migrated schema definitions using rawsql-ts SchemaManager
 * This replaces the local unified-schema.ts with library-based implementation
 */

// === Table Definitions ===

export const todoTableDef: TableDefinition = {
    name: 'todo',
    columns: {
        todo_id: { name: 'todo_id', isPrimaryKey: true },
        title: { name: 'title' },
        description: { name: 'description' },
        status: { name: 'status' },
        priority: { name: 'priority' },
        category_id: { name: 'category_id' },
        created_at: { name: 'created_at', jsonAlias: 'todo_created_at' },
        updated_at: { name: 'updated_at', jsonAlias: 'todo_updated_at' }
    },
    relationships: [
        { type: 'object', table: 'category', propertyName: 'category' },
        { type: 'array', table: 'todo_comment', propertyName: 'comments' }
    ]
};

export const categoryTableDef: TableDefinition = {
    name: 'category',
    columns: {
        category_id: { name: 'category_id', isPrimaryKey: true },
        name: { name: 'name', jsonAlias: 'category_name' },
        description: { name: 'description', jsonAlias: 'category_description' },
        color: { name: 'color', jsonAlias: 'category_color' },
        created_at: { name: 'created_at', jsonAlias: 'category_created_at' }
    }
};

export const todoCommentTableDef: TableDefinition = {
    name: 'todo_comment',
    columns: {
        todo_comment_id: { name: 'todo_comment_id', isPrimaryKey: true },
        todo_id: { name: 'todo_id', jsonAlias: 'comment_todo_id' },
        content: { name: 'content', jsonAlias: 'comment_content' },
        author_name: { name: 'author_name', jsonAlias: 'comment_author_name' },
        created_at: { name: 'created_at', jsonAlias: 'comment_created_at' }
    },
    relationships: [
        { type: 'object', table: 'todo', propertyName: 'todo' }
    ]
};

// === Schema Manager Instance ===

export const schemaManager = new SchemaManager({
    todo: todoTableDef,
    category: categoryTableDef,
    todo_comment: todoCommentTableDef
});

// === Backward Compatibility Functions ===

/**
 * Get table columns for SqlParamInjector (backward compatibility)
 */
export function getTableColumns(tableName: string): string[] {
    return schemaManager.getTableColumns(tableName);
}

/**
 * Create JSON mapping for PostgresJsonQueryBuilder (backward compatibility)
 */
export function createJsonMapping(tableName: string) {
    return schemaManager.createJsonMapping(tableName);
}
