# Some APIs for learning JavaScript

This repository contains many mini-projects that explore RESTful API concepts. It started in 2020, and I later stopped using it while creating other projects for similar experiments. Now, in 2026, I decided to refactor those side projects into this repository and add new technologies that I want to test.

### Why

I wanted to gather all use cases in one repository, and I want to stay language/tool-agnostic when creating REST APIs (although my main language is JavaScript).

### How this repository is structured

- #### `Database/`: Brings together several projects that explore different database technologies and ORMs. Aside from the database layer, the API stack is Node.js with Express and TypeScript.
- #### `Protocols/`: Mini-projects that study the basic concepts of internet communication protocols, such as SOAP, WebSocket, and HTTP with server-side rendering.
- #### `Languages/`: Basic RESTful API CRUD examples using frameworks from other programming languages that I am interested in and currently learning. I will add more content to this section later.
- #### `Frameworks/`: Focused on Node.js backend frameworks (all of them using TypeScript).

### TODO

- Database directory
    - [ ] Prisma (an ORM for TypeScript)
    - [Current] Redis (key-value DB)
    - [ ] MongoDB (document DB)
    - [ ] Neo4j (graph DB)
    - [ ] InfluxDB (time-series DB)
    - [ ] Elasticsearch (a search engine for DBs)
    - [ ] Apache Cassandra (column DB)
- Protocols directory
    - [ ] SOAP
    - [ ] WebSocket
    - [ ] SSR
- Languages directory
    - [ ] Flask
    - [ ] Elixir
    - [ ] Laravel
- Frameworks directory
    - [ ] NestJS
    - [ ] Adonis
    - [ ] Koa
    - [ ] Hapi
    - [ ] Meteor

### What most of them should include

- Full CRUD operations
- Proper CORS handling
- Clear error responses (such as 501, 404, 403, etc.)
- Clear success responses (such as 201, 203, 200, etc.)
- Documentation with a simple API route reference for testing
- For JavaScript framework projects only: all of them must support TypeScript and the MongoDB driver
- For language-specific projects only: each one must use at least one type of testing tool (E2E, unit, or integration)