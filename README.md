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

- Node.js 18 or higher
- For development version: rawsql-ts source code repository

## Contributing

Examples are extracted from the main rawsql-ts repository to provide focused demonstrations. When contributing:

1. Keep examples simple and focused
2. Include comprehensive documentation
3. Test with both stable and development versions
4. Follow the established directory structure
