# Nest Config Service

A scalable configuration management service built with **NestJS**, **GraphQL**, **TypeORM**, and **PostgreSQL**. This service provides a comprehensive API for managing configurations, users, spaces, and their relationships with multi-environment support and detailed change tracking.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Directory Structure](#directory-structure)
- [Entity Relationship Model](#entity-relationship-model)
- [Aggregation Paths](#aggregation-paths)
- [How It Works](#how-it-works)
- [Repository Pattern](#repository-pattern)
- [API Operations](#api-operations)
- [Authentication & Authorization](#authentication--authorization)
- [Setup & Installation](#setup--installation)
- [Running the Service](#running-the-service)

---

## Overview

The Nest Config Service is a configuration management platform that allows organizations to:

- **Manage Configurations** across multiple spaces and environments
- **Track Configuration History** with detailed change logs and audit trails
- **Control User Access** with role-based permissions per space (READ, CREATE, UPDATE, DELETE)
- **Authenticate Users** via JWT tokens with secret key/password authentication
- **Query Configurations** with advanced filtering by space and status
- **Organize Spaces** for different deployment environments or teams

### Key Features

✅ GraphQL API with auto-generated schema  
✅ JWT authentication with admin and space-level authorization  
✅ Configuration versioning and history tracking  
✅ Multi-space support with granular user permissions  
✅ Secret configuration support  
✅ Soft-delete capability for configurations  
✅ Clean architecture with clear separation of concerns  

---

## Architecture

This service follows **Clean Architecture** principles with clear separation between:

```
┌─────────────────────────────────────────┐
│      Presentation Layer (GraphQL)       │
│  (Resolvers, GraphQL Models, Inputs)    │
├─────────────────────────────────────────┤
│      Application Layer (Use Cases)      │
│  (Commands & Queries - CQRS Pattern)    │
├─────────────────────────────────────────┤
│      Domain Layer (Business Logic)      │
│  (Services, Models, Repositories)       │
├─────────────────────────────────────────┤
│    Infrastructure Layer (Adapters)      │
│  (TypeORM, Config, Auth, Database)      │
└─────────────────────────────────────────┘
```

### Layer Responsibilities

| Layer | Responsibility | Files |
|-------|---|---|
| **Presentation** | GraphQL resolvers, input/output types | `src/presentation/graphql/**` |
| **Application** | Use cases (commands & queries) | `src/application/use-cases/**` |
| **Domain** | Business logic, services, repositories | `src/application/domain/**` |
| **Infrastructure** | Database, ORM, auth, config | `src/infrastructure/**` |

---

## Directory Structure

```
src/
├── app.module.ts                          # Root application module
├── main.ts                                # Bootstrap entry point
│
├── application/                           # Application layer
│   ├── application.module.ts              # Application module
│   ├── contracts/                         # Input/output models
│   │   ├── create-config.model.ts
│   │   ├── create-space.model.ts
│   │   ├── create-user.ts
│   │   ├── authenticate.model.ts
│   │   └── ...
│   ├── domain/                            # Domain layer
│   │   ├── domain.module.ts
│   │   ├── config/
│   │   │   ├── config.service.ts          # Config business logic
│   │   │   ├── config.repository.ts       # Config data access
│   │   │   ├── config.module.ts
│   │   │   └── models/
│   │   ├── user/
│   │   │   ├── user.service.ts            # User business logic
│   │   │   ├── user.repository.ts         # User data access
│   │   │   ├── user.module.ts
│   │   │   └── models/
│   │   ├── space/
│   │   │   ├── space.service.ts           # Space business logic
│   │   │   ├── space.repository.ts        # Space data access
│   │   │   ├── space.module.ts
│   │   │   └── models/
│   │   └── config-history/
│   │       ├── config-history.service.ts
│   │       ├── config-history.repository.ts
│   │       └── ...
│   └── use-cases/                         # Application use cases
│       ├── use-case.module.ts             # Exports all commands/queries
│       ├── config/
│       │   ├── create-config.command.ts   # Command for creating configs
│       │   ├── get-config.query.ts        # Query for retrieving configs
│       │   ├── list-config.query.ts       # Query for listing configs
│       │   ├── update-config.command.ts
│       │   └── delete-config.command.ts
│       ├── user/
│       │   ├── create-user.command.ts
│       │   ├── update-user.command.ts
│       │   ├── authenticate.ts
│       │   ├── assign-space-auths.command.ts
│       │   └── ...
│       └── space/
│           ├── create-space.command.ts
│           ├── get-space.query.ts
│           ├── list-space.query.ts
│           └── delete-space.command.ts
│
├── presentation/                          # Presentation layer
│   ├── presentation.module.ts
│   └── graphql/
│       ├── grapql.module.ts               # GraphQL setup
│       ├── graphql-context.ts             # GraphQL context (request data)
│       ├── config/
│       │   ├── config.resolver.ts         # Config GraphQL resolver
│       │   └── models/
│       ├── user/
│       │   ├── user.resolver.ts           # User GraphQL resolver
│       │   └── models/
│       └── space/
│           ├── space.resolver.ts          # Space GraphQL resolver
│           └── space.model.ts
│
└── infrastructure/                        # Infrastructure layer
    ├── infra.module.ts
    ├── auth/                              # Authentication & authorization
    │   ├── jwt.strategy.ts
    │   ├── universal-auth.guard.ts
    │   ├── admin.guard.ts
    │   ├── space-auth.guard.ts
    │   ├── public-access.decorator.ts
    │   └── require-space-auth.decorator.ts
    ├── config/                            # Configuration management
    │   ├── app.config.ts
    │   ├── postgres.config.ts
    │   └── config.module.ts
    ├── typeorm/                           # Database entities & migrations
    │   ├── entities/
    │   │   ├── user.entity.ts
    │   │   ├── user-space-auth.entity.ts
    │   │   ├── space.entity.ts
    │   │   ├── config.entity.ts
    │   │   ├── config-history.entity.ts
    │   │   └── config-environment.enum.ts
    │   ├── migrations/
    │   ├── orm.module.ts
    │   └── data-source.ts
    └── swagger/                           # Swagger/OpenAPI setup
        └── swagger.service.ts
```

---

## Entity Relationship Model

### Database Schema

```
┌─────────────────────────────────────────────────────────────┐
│                          ENTITIES                            │
└─────────────────────────────────────────────────────────────┘

Users (1) ─────── (Many) UserSpaceAuth (Many) ─── (1) Spaces
  │                              │
  │                              └─ Auth Type: READ, CREATE, UPDATE, DELETE
  │
  └─ Credentials: secretKey, secretPassword
     Admin: boolean


Configs (Many) ────────── (1) ConfigHistory (Many)
  │                              │
  │                              └─ changedByUser: uuid
  │                              └─ old/newValue: JSON
  │                              └─ changeDate: timestamp
  │                              └─ updateReason: text
  │
  └─ name: string
  └─ space: string (foreign key to Spaces)
  └─ value: JSON
  └─ isDisabled: boolean
  └─ isSecret: boolean
  └─ createdAt, updatedAt: timestamps
```

### Entity Details

#### 1. **User Entity**
```typescript
{
  id: uuid (PK)
  username: string (unique)
  description: string
  secretKey: string
  secretPassword: string
  isAdmin: boolean
  spaceAuths: UserSpaceAuth[] // One-to-many relationship
}
```

#### 2. **Space Entity**
```typescript
{
  id: uuid (PK)
  name: string (unique)
  description: string
  environment: string
}
```

#### 3. **Config Entity**
```typescript
{
  id: uuid (PK)
  name: string
  value: JSON
  space: string (refers to Space.name)
  description: string
  isDisabled: boolean
  isSecret: boolean
  createdAt: timestamp
  updatedAt: timestamp
  history: ConfigHistory[] // One-to-many relationship
}
```

#### 4. **UserSpaceAuth Entity**
```typescript
{
  id: uuid (PK)
  userId: uuid (FK → User.id)
  spaceName: string (FK → Space.name)
  auth: enum(READ, CREATE, UPDATE, DELETE)
}
```

#### 5. **ConfigHistory Entity**
```typescript
{
  id: uuid (PK)
  configId: uuid (FK → Config.id)
  updateReason: string
  oldValue: JSON
  newValue: JSON
  changeDate: timestamp
  changedByUser: uuid
}
```

---

## Aggregation Paths

Aggregation paths define how entities are loaded and their relationships traversed:

### Path 1: User → Space Authorizations
```
User
  └─ spaceAuths: UserSpaceAuth[]
      └─ spaceName: string
      └─ auth: UserAuthType (READ, CREATE, UPDATE, DELETE)
```
**Usage**: Determine what operations a user can perform in a specific space.

### Path 2: Config → History
```
Config
  └─ history: ConfigHistory[]
      ├─ oldValue: JSON (previous configuration value)
      ├─ newValue: JSON (current configuration value)
      ├─ changeDate: timestamp
      ├─ updateReason: string
      └─ changedByUser: uuid (references User.id)
```
**Usage**: Audit trail and version control for configurations.

### Path 3: Space → Configs (logical, via config.space field)
```
Space
  └─ Configs (retrieved by filtering: where space = space.name)
      ├─ name: string
      ├─ value: JSON
      └─ isDisabled: boolean
```
**Usage**: Retrieve all configurations belonging to a specific space.

### Path 4: User → Spaces (via UserSpaceAuth)
```
User
  └─ spaceAuths: UserSpaceAuth[]
      └─ spaceName: string (can be joined with Space entity)
```
**Usage**: Find all spaces a user has access to and their permission level.

### Aggregation Loading Strategy

- **Eager Loading**: `User.spaceAuths` is loaded eagerly with the user
- **Lazy Loading**: `Config.history` is loaded on-demand for performance
- **Implicit Relationships**: Config.space is a string reference (not typed relationship)

---

## How It Works

### 1. Request Flow (GraphQL Query/Mutation)

```
┌─────────────────────────────────────────────────────────────┐
│ 1. GraphQL Request arrives at Resolver                      │
│    e.g., query getConfig(name, space)                       │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│ 2. Resolver injects Use Case (Query/Command)                │
│    e.g., GetConfigQuery                                     │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│ 3. Use Case executes business logic                         │
│    Validation, orchestration between services               │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│ 4. Service performs domain operations                       │
│    e.g., ConfigService.findByName()                         │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│ 5. Repository queries database via TypeORM                  │
│    e.g., ConfigRepository.findOne({ where: { name } })      │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│ 6. Entity is mapped to DTO and returned                     │
│    ConfigEntity → Config (domain model)                     │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│ 7. GraphQL transforms to response type and sends            │
│    Config → ConfigGQLModel                                  │
└─────────────────────────────────────────────────────────────┘
```

### 2. CQRS Pattern (Command Query Responsibility Segregation)

**Queries** (Read operations - no side effects):
- `GetConfigQuery` - Retrieve a single config
- `ListConfigQuery` - Retrieve multiple configs with filters
- `GetSpaceQuery` - Retrieve a single space
- `ListSpaceQuery` - Retrieve all spaces
- `GetUserQuery` - Retrieve a user

**Commands** (Write operations - create, update, delete):
- `CreateConfigCommand` - Create a new config + history entry
- `UpdateConfigCommand` - Update config + history entry
- `DeleteConfigCommand` - Soft-delete config + history entry
- `CreateUserCommand` - Create a new user
- `CreateSpaceCommand` - Create a new space
- `AssignSpaceAuthsCommand` - Assign permissions to user

### 3. Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│ User calls login(username, secretKey, secretPassword)       │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│ AuthResolver calls AuthenticateUser use case                │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│ UserService.authenticate() validates credentials            │
│ 1. Find user by username                                    │
│ 2. Compare secretKey & secretPassword                       │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│ If valid: Create JWT token with user context                │
│ Payload includes: userId, username, spaceAuths, isAdmin     │
│ Expiry: 15 minutes                                          │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│ Return JWT token + expiredAt to client                      │
└─────────────────────────────────────────────────────────────┘
```

### 4. Authorization (Guards)

- **UniversalAuthGuard**: Validates JWT token on all requests
- **AdminGuard**: Checks if user.isAdmin = true (for admin operations)
- **SpaceAuthGuard**: Validates user has required permission in specific space
- **@Public()**: Bypasses auth for public operations (login, etc.)

---

## Repository Pattern

### Purpose

Repositories abstract data access and provide domain models, not database entities. This ensures clean separation between domain and infrastructure.

### Structure

**Entity Layer** (Database):
```typescript
// ConfigEntity - TypeORM entity (closely mirrors DB schema)
export class ConfigEntity {
  @PrimaryGeneratedColumn() id: string;
  @Column() name: string;
  @Column() value: string; // JSON stored as string
  @OneToMany(() => ConfigHistoryEntity, ...) history: ConfigHistoryEntity[];
}
```

**Repository Layer** (Data Access):
```typescript
export class ConfigRepository {
  // Database operations via TypeORM
  async findByName(space: string, name: string): Promise<Config | null> {
    const entity = await this.typeormRepository.findOne({
      where: { name, space }
    });
    return entity ? this.mapToDTO(entity) : null;
  }

  // Mapping function: Entity → Domain Model
  private mapToDTO(entity: ConfigEntity): Config {
    return {
      id: entity.id,
      name: entity.name,
      value: JSON.parse(entity.value), // Deserialize JSON
      space: entity.space,
      isDisabled: entity.isDisabled,
      // ...
    };
  }
}
```

**Service Layer** (Business Logic):
```typescript
export class ConfigService {
  async findByName(space: string, name: string): Promise<Config | null> {
    const config = await this.configRepository.findByName(space, name);
    // Business logic, validation, etc.
    return config;
  }
}
```

**Use Case Layer** (Application Logic):
```typescript
export class GetConfigQuery {
  async execute(space: string, name: string): Promise<Config> {
    const config = await this.configService.findByName(space, name);
    if (!config) throw new NotFoundException();
    return config;
  }
}
```

### Key Benefits

✅ **Testability**: Mock repositories for unit tests  
✅ **Maintainability**: Change DB without touching business logic  
✅ **Clean Domain Models**: DTOs are separate from ORM entities  
✅ **Consistency**: All data access goes through repositories  

---

## API Operations

### Configuration Operations

#### Create Config
```graphql
mutation {
  createConfig(
    space: "production"
    input: {
      name: "database_url"
      value: "{\"host\":\"localhost\"}"
      description: "Database connection URL"
      isSecret: false
    }
  ) {
    id
    name
    value
    isDisabled
  }
}
```

#### Get Config
```graphql
query {
  getConfig(name: "database_url", space: "production") {
    id
    name
    value
    description
    isSecret
  }
}
```

#### List Configs (with filters)
```graphql
query {
  getConfigs(space: "production", isDisabled: false) {
    id
    name
    value
    isDisabled
  }
}
```

#### Update Config
```graphql
mutation {
  updateConfig(
    name: "database_url"
    space: "production"
    input: {
      value: "{\"host\":\"new-host\"}"
      isDisabled: false
    }
  ) {
    id
    name
    value
  }
}
```

#### Delete Config
```graphql
mutation {
  deleteConfig(
    name: "database_url"
    space: "production"
    updateReason: "Config no longer needed"
  )
}
```

### Space Operations

#### Create Space
```graphql
mutation {
  createSpace(input: {
    name: "staging"
    environment: "stage"
    description: "Staging environment"
  }) {
    id
    name
    environment
  }
}
```

#### Get Space
```graphql
query {
  getSpace(name: "production") {
    id
    name
    environment
    description
  }
}
```

#### List Spaces
```graphql
query {
  listSpaces {
    id
    name
    environment
    description
  }
}
```

#### Delete Space
```graphql
mutation {
  deleteSpace(name: "staging")
}
```

### User Operations

#### Create User
```graphql
mutation {
  createUser(input: {
    username: "john_doe"
    secretKey: "secret123"
    secretPassword: "password456"
    description: "John Doe"
    isAdmin: false
  }) {
    id
    username
    isAdmin
  }
}
```

#### Authenticate User
```graphql
query {
  login(
    username: "john_doe"
    secretKey: "secret123"
    secretPassword: "password456"
  ) {
    jwtToken
    expiredAt
  }
}
```

#### Update User
```graphql
mutation {
  updateUser(
    username: "john_doe"
    input: { description: "Updated description" }
  ) {
    id
    username
    description
  }
}
```

#### Assign Space Auths
```graphql
mutation {
  assignSpaceAuths(
    username: "john_doe"
    input: {
      spaceAuths: [
        { spaceName: "production", userAuthType: "read" }
        { spaceName: "staging", userAuthType: "create" }
      ]
    }
  ) {
    id
    username
    spaceAuths {
      spaceName
      userAuthType
    }
  }
}
```

#### Delete User
```graphql
mutation {
  deleteUser(username: "john_doe")
}
```

---

## Authentication & Authorization

### Authentication Mechanism

1. **User Registration**: Create user with unique username, secret key, and password
2. **Login**: User provides credentials (username, secretKey, secretPassword)
3. **JWT Generation**: Server creates JWT token with 15-minute expiry
4. **Token Validation**: Client includes token in Authorization header for all requests

### JWT Token Payload
```json
{
  "userId": "uuid",
  "username": "john_doe",
  "isAdmin": true,
  "spaceAuths": [
    { "spaceName": "production", "userAuthType": "read" },
    { "spaceName": "staging", "userAuthType": "create" }
  ],
  "iat": 1234567890,
  "exp": 1234569890
}
```

### Authorization Levels

| Guard | Purpose | Scope |
|-------|---------|-------|
| `@Public()` | No authentication required | `login` mutation |
| `UniversalAuthGuard` | Valid JWT required | All protected resolvers |
| `AdminGuard` | User.isAdmin = true | User, Space management |
| `SpaceAuthGuard` | User has required auth in space | Config operations |
| `@RequireSpaceAuth(space, authType)` | Specific permission check | Granular operations |

### Authorization Flow

```
Request with JWT token
  │
  ├─→ UniversalAuthGuard
  │   ├─→ Extract & validate token
  │   ├─→ Decode payload
  │   └─→ Attach user context to request
  │
  ├─→ (If @AdminGuard) Check user.isAdmin
  │
  ├─→ (If @SpaceAuthGuard) Check user.spaceAuths for permission
  │   └─→ Verify UserAuthType (READ, CREATE, UPDATE, DELETE)
  │
  └─→ Execute resolver
```

---

## Setup & Installation

### Prerequisites

- **Node.js**: 18.0+
- **npm**: 9.0+
- **PostgreSQL**: 14.0+
- **Git**: 2.0+

### Installation Steps

1. **Clone Repository**
```bash
git clone <repository-url>
cd nest-config-service
```

2. **Install Dependencies**
```bash
npm install
```

3. **Setup Environment Variables**

Create `.env` file in project root:
```env
# App Configuration
APP_PORT=3000
APP_JWT_SECRET=your-super-secret-jwt-key-min-32-chars

# Database Configuration
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=config_service
```

4. **Initialize Database**

Create PostgreSQL database:
```bash
createdb config_service
```

5. **Run Migrations**
```bash
npm run migration:run
```

---

## Running the Service

### Development Mode
```bash
npm run start:dev
```
- Starts with hot-reload
- Watches for file changes
- Runs on http://localhost:3000

### Debug Mode
```bash
npm run start:debug
```
- Starts with Node debugger enabled
- Accessible on port 9229
- Use Chrome DevTools: `chrome://inspect`

### Production Mode
```bash
npm run build
npm run start:prod
```

### Running Tests
```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:cov

# E2E tests
npm run test:e2e
```

### Linting & Formatting
```bash
# Fix linting issues
npm run lint

# Format code
npm run format
```

---

## Database Migrations

### Generate New Migration
```bash
npm run migration:generate -- -n NameOfMigration
```

### Run Migrations
```bash
npm run migration:run
```

### Revert Last Migration
```bash
npm run migration:revert
```

### Create Empty Migration
```bash
npm run migration:create -- -n NameOfMigration
```

---

## Key Technologies

| Technology | Purpose | Version |
|---|---|---|
| **NestJS** | Node.js framework | 11.0+ |
| **GraphQL** | API query language | 16.13+ |
| **Apollo Server** | GraphQL server | 5.4+ |
| **TypeORM** | ORM for Node.js | 0.3+ |
| **PostgreSQL** | Relational database | 14+ |
| **JWT (jose)** | Token authentication | 6.2+ |
| **Passport** | Authentication middleware | 11.0+ |

---

## Project Structure Summary

```
Clean Architecture with Clear Separation:

┌─ Presentation (GraphQL Resolvers)
│  └─ Receives GraphQL queries/mutations
│     Returns formatted responses
│
├─ Application (Use Cases)
│  └─ CQRS Commands & Queries
│     Orchestrates business logic
│
├─ Domain (Services & Repositories)
│  └─ Business logic
│     Data access abstraction
│
└─ Infrastructure (Database, Auth, Config)
   └─ TypeORM entities & migrations
      Authentication & JWT
      Application configuration
```

---

## Contributing Guidelines

1. Follow the existing architecture pattern
2. Keep repositories thin - logic belongs in services
3. Use DTOs for cross-layer communication
4. Implement proper error handling
5. Add tests for new features
6. Follow NestJS best practices

---

## Common Issues & Solutions

### Issue: "Nest can't resolve dependencies"
**Solution**: Ensure use cases are exported in `use-case.module.ts` and resolver has them injected.

### Issue: "JWT token expired"
**Solution**: Token expires in 15 minutes. Request new token via `login` mutation.

### Issue: "User not authorized for space"
**Solution**: Assign space auth to user via `assignSpaceAuths` mutation before attempting space-specific operations.

### Issue: "Migration failed"
**Solution**: Ensure PostgreSQL is running and `.env` database credentials are correct.

---

## License

This project is UNLICENSED.

---

## Support

For issues and feature requests, please create an issue in the repository.

---

**Last Updated**: April 2026  
**Service Version**: 0.0.1
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

