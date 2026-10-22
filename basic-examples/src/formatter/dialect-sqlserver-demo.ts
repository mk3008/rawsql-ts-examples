// Execution instructions for Windows:
// 1. Open a terminal in the project root directory.
// 2. Run the following command:
//    npx ts-node demo/formatter/dialect-sqlserver-demo.ts

import { SelectQueryParser, SqlFormatter } from 'rawsql-ts';

const sql = 'select [user_id], [name] from [users] where [active] = @active';
const query = SelectQueryParser.parse(sql);

// Default formatting
const defaultFormatter = new SqlFormatter();
const defaultFormattedSql = defaultFormatter.format(query).formattedSql;
console.log('Default   :', defaultFormattedSql);
// => select "user_id", "name" from "users" where "active" = :active

// MySQL formatting
const mysqlFormatter = new SqlFormatter({ preset: 'mysql' });
const mysqlFormattedSql = mysqlFormatter.format(query).formattedSql;
console.log('MySQL     :', mysqlFormattedSql);
// => select `user_id`, `name` from `users` where `active` = ?

// PostgreSQL formatting
const postgresFormatter = new SqlFormatter({ preset: 'postgres' });
const postgresFormattedSql = postgresFormatter.format(query).formattedSql;
console.log('PostgreSQL:', postgresFormattedSql);
// => select "user_id", "name" from "users" where "active" = :active

// SQL Server formatting
const sqlServerFormatter = new SqlFormatter({ preset: 'sqlserver' });
const sqlServerFormattedSql = sqlServerFormatter.format(query).formattedSql;
console.log('SQL Server:', sqlServerFormattedSql);
// => select [user_id], [name] from [users] where [active] = @active

// SQLite formatting
const sqliteFormatter = new SqlFormatter({ preset: 'sqlite' });
const sqliteFormattedSql = sqliteFormatter.format(query).formattedSql;
console.log('SQLite    :', sqliteFormattedSql);
// => select "user_id", "name" from "users" where "active" = :active
