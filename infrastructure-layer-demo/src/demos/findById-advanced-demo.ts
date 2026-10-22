import { RawSQLTodoRepository } from '../infrastructure/rawsql-infrastructure';
import { ITodoRepository } from '../contracts/repository-interfaces';
import { TodoDetail } from '../domain/entities';
import { exampleCriteria } from './example-data';

/**
 * Advanced FindById Query Demo
 * Comprehensive testing of SqlParamInjector + PostgreSQL JSON projection integration
 * Focuses on complex query scenarios, error handling, and search criteria patterns
 */

async function runAdvancedFindByIdDemo() {
    console.log('🚀 Advanced FindById Query Demo');
    console.log('=====================================\n');

    // Initialize repository with debug logging
    const todoRepository: ITodoRepository = new RawSQLTodoRepository(true);

    // Test database connection
    console.log('🔌 Testing database connection...');
    const isConnected = await (todoRepository as RawSQLTodoRepository).testConnection();

    if (!isConnected) {
        console.log('❌ Database connection failed. Start Docker container:');
        console.log('   docker-compose up -d');
        process.exit(1);
    }

    console.log('✅ Database connected!\n');

    try {
        // Test Case 1: Find existing todo with related data
        console.log('📋 Test Case 1: Find Todo with Related Data');
        console.log('─'.repeat(50));
        console.log('🔍 Searching for todo ID: 1');
        console.log('📝 Expected: Hierarchical JSON with category and comments\n');

        const todoDetail = await todoRepository.findById('1');

        if (todoDetail) {
            console.log('✅ Todo found!');
            console.log('📊 TodoDetail Structure:');
            console.log(JSON.stringify(todoDetail, null, 2));
            console.log();

            console.log('🎯 Key Features Demonstrated:');
            console.log('   • SqlParamInjector: Automatic WHERE clause generation');
            console.log('   • PostgreSQL JSON projection: Hierarchical JSON structure');
            console.log('   • Single query: Todo + Category + Comments');
            console.log('   • Type-safe result: TodoDetail interface\n');
        } else {
            console.log('❌ Todo not found');
        }        // Test Case 2: Find non-existing todo
        console.log('📋 Test Case 2: Find Non-Existing Todo');
        console.log('─'.repeat(50));
        console.log('🔍 Searching for todo ID: 999\n');

        const nonExistentTodo = await todoRepository.findById('999');

        if (nonExistentTodo === null) {
            console.log('✅ Correctly returned null for non-existent todo');
            console.log('🎯 Null handling verified\n');
        } else {
            console.log('❌ Unexpected result for non-existent todo\n');
        }

        // Test Case 3: Multiple todos comparison
        const testIds = ['2', '3'];
        console.log('📋 Test Case 3: Multiple Todos Structure Comparison');
        console.log('─'.repeat(50));

        for (const id of testIds) {
            console.log(`🔍 Todo ID: ${id}`);
            const todo = await todoRepository.findById(id);

            if (todo) {
                console.log(`   ✅ "${todo.title}" (${todo.status}, ${todo.priority})`);
                console.log(`   📂 Category: ${todo.category?.name || 'None'}`);
                console.log(`   💬 Comments: ${todo.comments?.length || 0}`);
            } else {
                console.log(`   ❌ Not found`);
            }
            console.log();
        }

        // Test Case 4: Complex Search Criteria Testing
        console.log('\n📋 Test Case 4: Complex Search Criteria Demonstration');
        console.log('─'.repeat(50));
        console.log('🎯 Testing various search patterns with example criteria\n');

        // Test each example criteria pattern
        for (let i = 0; i < Math.min(exampleCriteria.length, 5); i++) {
            const criteria = exampleCriteria[i];
            const criteriaDescription = Object.keys(criteria).length === 0
                ? 'Empty criteria (all records)'
                : Object.entries(criteria)
                    .filter(([key, value]) => value !== undefined)
                    .map(([key, value]) => {
                        if (key === 'fromDate' || key === 'toDate') {
                            return `${key}: ${value instanceof Date ? value.toISOString().split('T')[0] : value}`;
                        }
                        return `${key}: ${value}`;
                    })
                    .join(', ');

            console.log(`🔍 Search Pattern ${i + 1}: ${criteriaDescription}`);

            try {
                // Use buildSearchQuery to demonstrate SQL generation without executing
                const queryResult = (todoRepository as RawSQLTodoRepository).buildSearchQuery(criteria);
                console.log(`   📝 Generated SQL preview: ${queryResult.formattedSql.substring(0, 80)}...`);
                console.log(`   📊 Parameter count: ${queryResult.params.length}`);

                // Execute the actual search
                const searchResults = await todoRepository.findByCriteria(criteria);
                console.log(`   ✅ Results: ${searchResults.length} todos found`);

                if (searchResults.length > 0) {
                    const firstResult = searchResults[0];
                    console.log(`   📄 Sample: "${firstResult.title}" (${firstResult.status})`);
                }

            } catch (error) {
                console.log(`   ❌ Search failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }

            console.log();
        }

        console.log('🎯 Search Criteria Benefits Demonstrated:');
        console.log('   • Dynamic WHERE clause generation');
        console.log('   • Automatic parameter binding');
        console.log('   • SQL injection prevention');
        console.log('   • Flexible search combinations');

        console.log('🎉 Demo completed successfully!');
        console.log('\n💡 Architecture Benefits:');
        console.log('   • Clean separation: domain vs infrastructure');
        console.log('   • Automatic SQL with type safety');
        console.log('   • Single query for hierarchical data');
        console.log('   • Configurable debug logging');

        // Debug logging control example
        console.log('\n🛠️ Debug Logging Control:');
        console.log('   const repo = new RawSQLTodoRepository(true);  // Enable');
        console.log('   repo.setDebugLogging(false);                  // Disable');

    } catch (error) {
        console.error('❌ Demo failed:', error);
    } finally {
        await (todoRepository as RawSQLTodoRepository).close();
        console.log('\n👋 Database connection closed');
    }
}

// Run demo if executed directly
if (require.main === module) {
    runAdvancedFindByIdDemo().catch(console.error);
}

export { runAdvancedFindByIdDemo };
