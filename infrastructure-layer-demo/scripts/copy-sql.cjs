const { cpSync } = require('node:fs');
const { join } = require('node:path');

cpSync(
    join(__dirname, '../src/infrastructure/sql'),
    join(__dirname, '../dist/infrastructure/sql'),
    { recursive: true }
);
