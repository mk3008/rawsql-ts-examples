# rawsql-ts Examples

This repository contains comprehensive examples and demonstrations for **rawsql-ts**, a TypeScript library for type-safe SQL query building.

## Repository Structure

### [basic-examples/](./basic-examples)
Basic usage examples demonstrating core rawsql-ts features:
- Dynamic JOIN and WHERE clause building
- Asynchronous operations
- Query result collection
- SQL formatting and parameter injection

### [infrastructure-layer-demo/](./infrastructure-layer-demo)
Enterprise-grade implementation showcasing:
- Advanced type safety with runtime validation
- Performance comparisons with ORMs (Prisma)
- Clean architecture patterns
- Advanced database operations

## Development Setup

### rawsql-ts Version Management

Choose your development pattern and follow the complete workflow:

#### Pattern 1: Using Stable NPM Version (Recommended for Production)

```bash
# For basic-examples
cd basic-examples
npm install
npm run switch:stable
npm run demo:appendJoin

# For infrastructure-layer-demo
cd infrastructure-layer-demo
npm install
npm run switch:stable
npm run demo:findById
```

#### Pattern 2: Using Local Development Version (For Testing New Features)

```bash
# For basic-examples
cd basic-examples
npm install
npm run switch:dev
npm run demo:appendJoin

# For infrastructure-layer-demo
cd infrastructure-layer-demo
npm install
npm run switch:dev
npm run demo:findById
```

**Requirements for Pattern 2**: rawsql-ts source code must be available at `../../rawsql-ts` relative to this repository.

## Quick Start

1. Clone this repository
2. Navigate to the desired example directory
3. Install dependencies: `npm install`
4. Choose rawsql-ts version:
   - For production use: `npm run switch:stable`
   - For testing new features: `npm run switch:dev`
5. Run examples as described in each directory's README

## Prerequisites

- Node.js 22.23.4 or 24.22.1 (the CI versions)
- For development version: rawsql-ts source code repository

## Contributing

Examples are extracted from the main rawsql-ts repository to provide focused demonstrations. When contributing:

1. Keep examples simple and focused
2. Include comprehensive documentation
3. Test with both stable and development versions
4. Follow the established directory structure

## Validation

The default examples use the published `rawsql-ts@0.30.1`; no sibling checkout is required.
Install with `npm ci --ignore-scripts`, then explicitly generate Prisma types with
`npm run prisma:generate --workspace=infrastructure-layer-demo` before `npm run build`.
`npm test` checks complete generated SQL, parameter boundaries, schema consistency,
and the four formatter dialect presets.

For a real PostgreSQL check, set `DATABASE_URL` and run
`npm run test:database --workspace=infrastructure-layer-demo`. The check creates an
isolated schema inside a transaction and rolls back its tables and seed data.
CI runs this check on PostgreSQL 17 with Node 22 and 24.

JSON list/detail results, nested categories, and comment arrays remain supported.
The removed JSON builder and schema `jsonAlias` metadata are replaced by explicit
sample SQL in `infrastructure-layer-demo/src/infrastructure/sql/todo-*-json.sql`.
The parameterized query AST is inserted into the `origin_query` CTE without
interpolating user input or losing its bound values. Physical schema validation
continues to use the current `SchemaManager` and `SqlSchemaValidator` APIs.
