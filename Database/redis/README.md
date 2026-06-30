# Redis API

Simple REST API using Express + Redis OM with Swagger documentation.

## Prerequisites

- Node.js 18+
- npm
- Redis with RediSearch support (recommended: Redis Stack)

## Install

From this folder:

```bash
npm install
```

## Environment

Optional environment variable:

- REDIS_URL (default: redis://127.0.0.1:6379)

Example (PowerShell):

```powershell
$env:REDIS_URL="redis://127.0.0.1:6379"
```

## Run Server

Development:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Start from build output:

```bash
npm run start
```

Server runs at:

- http://localhost:3333

## Swagger Docs

- Swagger UI: http://localhost:3333/api-docs
- OpenAPI JSON: http://localhost:3333/swagger.json

## Available Routes

- GET /
- GET /users
- POST /users
- GET /users/:id
- PUT /users/:id
- DELETE /users/:id

## Notes

- The users index is created on demand in Redis OM.
- If RediSearch is not available, search/index routes can fail.
