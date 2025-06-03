# rawsql-ts Basic Examples

This package contains basic usage examples for **rawsql-ts**, demonstrating core features and common patterns.

## Features Demonstrated

- **appendJoin**: Dynamic JOIN clause building
- **appendWhere**: Conditional WHERE clause construction
- **asyncUnion**: Asynchronous UNION operations
- **collector**: Query result collection and processing
- **formatter**: SQL formatting and beautification
- **paramInjector**: Parameter injection and SQL injection prevention

## Prerequisites and Setup

### rawsql-ts Version Selection

This demo supports both stable NPM releases and development versions:

```bash
# Use stable NPM version (recommended for production)
npm run switch:stable

# Use local development version (for testing new features)
npm run switch:dev
```

### System Requirements
- Node.js 18 or higher

### Installation

```bash
npm install
```

## Running Examples

Each example can be run individually:

```bash
# Run all examples
npm start

# Run specific examples
npm run demo:appendJoin
npm run demo:appendWhere
npm run demo:asyncUnion
npm run demo:collector
npm run demo:formatter
npm run demo:paramInjector
```

## Example Structure

```
src/
├── appendJoin/          # Dynamic JOIN operations
├── appendWhere/         # Conditional WHERE clauses
├── asyncUnion/          # Asynchronous UNION queries
├── collector/           # Result collection patterns
├── formatter/           # SQL formatting utilities
└── paramInjector/       # Parameter injection examples
```

## Development

To switch between rawsql-ts versions during development:

```bash
# Switch to development version (requires rawsql-ts source at ../../rawsql-ts)
npm run switch:dev

# Switch back to stable version
npm run switch:stable
```

## License

MIT
