<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

# Book Collection API

## Overview
The **Book Collection API** is a RESTful API built using the [NestJS](https://nestjs.com/) framework. It enables users to manage books and topics, providing endpoints for creating, updating, retrieving, and deleting books and topics stored in a MongoDB database.

## Project Structure

books-collection-api
      │ 
      │
      ├── api/
      │   ├── books/
      │   │   ├── dto/
      │   │   │   ├── create-book.dto.ts
      │   │   │   ├── update-book.dto.ts
      │   │   │
      │   │   ├── interfaces/
      │   │   │   ├── book.interface.ts
      │   │   │
      │   │   ├── schemas/
      │   │   │   ├── book.schema.ts
      │   │   │
      │   │   ├── tests/
      │   │   │   ├── books.controller.spec.ts
      │   │   │   ├── books.service.spec.ts
      │   │   │
      │   │   ├── books.controller.ts
      │   │   ├── books.service.ts
      │   │   ├── books.module.ts
      │   │
      │   ├── topics/
      │   │   ├── dto/
      │   │   │   ├── create-topic.dto.ts
      │   │   │   ├── update-topic.dto.ts
      │   │   │
      │   │   ├── interfaces/
      │   │   │   ├── topic.interface.ts
      │   │   │
      │   │   ├── schemas/
      │   │   │   ├── topic.schema.ts
      │   │   │
      │   │   ├── tests/
      │   │   │   ├── topics.controller.spec.ts
      │   │   │   ├── topics.service.spec.ts
      │   │   │
      │   │   ├── topics.controller.ts
      │   │   ├── topics.service.ts
      │   │   ├── topics.module.ts
      │
      ├── src/
      │   ├── app.controller.ts
      │   ├── app.module.ts
      │   ├── app.service.ts
      │   ├── main.ts
      │
      ├── config/
      │   ├── database.config.ts
      │
      ├── utils/
      │   ├── constants.ts
      │
      ├── third-party/
      │   ├── logger.service.ts
      │   ├── third-party.module.ts
      │
      ├── test/
      │   ├── app.e2e-spec.ts
      │   ├── jest-e2e.json
      │
      ├── .env
      ├── .gitignore
      ├── nest-cli.json
      ├── package.json
      ├── tsconfig.build.json
      ├── tsconfig.json

## Structure Details

### Explanation of the `books-collection-api` Folder Structure:

#### 1. **Top-Level Structure**
- **`books-collection-api/`**: The root folder of the project containing all necessary files and subdirectories for the NestJS application.

#### 2. **`api/`**
- **Purpose**: Houses all the main domain-specific modules, making it easy to locate and manage features related to the application's business logic.
- **Contents**:
  - **`books/`**: Contains files specific to the `books` feature.
    - **`dto/`**: Contains Data Transfer Object files used for validating and transferring data during book creation and updates.
    - **`interfaces/`**: Defines TypeScript interfaces for strong typing, ensuring consistent data structures.
    - **`schemas/`**: Contains Mongoose schemas to define how `Book` documents are structured in MongoDB.
    - **`tests/`**: Unit and integration tests for the `books` module.
    - **`books.controller.ts`**: Defines the controller with routes for handling HTTP requests.
    - **`books.service.ts`**: Contains business logic and interacts with the database through Mongoose.
    - **`books.module.ts`**: The module file that ties together the controller, service, and other resources for the `books` feature.
  
  - **`topics/`**: Follows the same structure as the `books/` module but focuses on `topics` functionality.
    - **Files**: `dto`, `interfaces`, `schemas`, `tests`, `topics.controller.ts`, `topics.service.ts`, and `topics.module.ts`.

#### 3. **`src/`**
- **Purpose**: Holds the core NestJS setup and entry files.
- **Contents**:
  - **`app.controller.ts`**, **`app.service.ts`**, and **`app.module.ts`**: Define the main application logic and bootstrap the application by importing other modules.
  - **`main.ts`**: The entry point of the application that initializes the NestJS framework and starts the server.

#### 4. **`config/`**
- **Purpose**: Contains configuration files, such as `database.config.ts`, for handling database connections and environment-specific settings.

#### 5. **`utils/`**
- **Purpose**: Provides utility files and shared resources.
- **Contents**:
  - **`constants.ts`**: A central place for storing reusable constants used throughout the project.

#### 6. **`third-party/`**
- **Purpose**: Encapsulates code for integrating third-party services or external modules.
- **Contents**:
  - **`logger.service.ts`**: Custom logging service for enhanced logging capabilities.
  - **`third-party.module.ts`**: Module configuration for third-party service integration.

#### 7. **Configuration and Project Metadata Files**
- **`.env`**: Stores environment variables for secure and flexible configuration.
- **`.gitignore`**: Specifies files and directories that should not be tracked by Git.
- **`nest-cli.json`**: Configuration for the NestJS CLI.
- **`package.json`**: Lists project dependencies and scripts.
- **`tsconfig.build.json`** and **`tsconfig.json`**: TypeScript configuration files for building and running the project.

### Advantages of This Folder Structure:

1. **Modular Organization**:
   - Grouping features into separate modules (`books`, `topics`) in the `api/` folder allows for easier scalability, code management, and collaboration among developers.

2. **Separation of Concerns**:
   - Each module encapsulates its own DTOs, interfaces, schemas, tests, controllers, services, and module files, which keeps the codebase organized and maintainable.

3. **Reusability and Testability**:
   - Having a dedicated `tests/` folder within each module makes it straightforward to run unit tests for individual features, leading to better test coverage and easier debugging.

4. **Scalability**:
   - As new features are added, new modules can be created within the `api/` folder without cluttering the core `src/` directory.

5. **Clear Configuration and Utility Management**:
   - The `config/` folder centralizes configuration settings, making it easy to adjust database and environment-specific configurations without affecting other parts of the codebase.
   - The `utils/` folder provides a shared space for constants and reusable utilities, promoting consistency across the project.

6. **Integration with Third-Party Services**:
   - The `third-party/` folder isolates external service integration, making it easier to manage and replace services if needed.

7. **Standardized Project Setup**:
   - This structure follows best practices for NestJS applications, ensuring the code is organized in a way that is familiar to developers who have experience with NestJS, facilitating team collaboration.

This organization enhances code readability, maintainability, and scalability, making it ideal for complex and growing projects.


### Project setup

## Clone the repository:
```bash
   git clone https://github.com/Harish-J/books-collection-api.git
   cd books-collection-api

```

## Installation

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Document URL
```bash
http://localhost:3000/api

```
## Run tests

```bash

# test with coverage
$ npm run test:cov

# unit tests
$ npm run test
```


## API Endpoints

### Books
- **POST /books**: Create a new book.
- **GET /books**: Retrieve all books or search by query with pagination.
- **GET /books/:id**: Retrieve a book by ID.
- **PUT /books/:id**: Update a book by ID.
- **DELETE /books/:id**: Delete a book by ID.

### Topics
- **POST /topics**: Create a new topic.
- **GET /topics**: Retrieve all topics.
- **GET /topics/:id**: Retrieve a topic by ID.
- **PUT /topics/:id**: Update a topic by ID.
- **DELETE /topics/:id**: Delete a topic by ID.

## Technologies Used
- **NestJS**: Framework for building scalable server-side applications.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM library for MongoDB.
- **TypeScript**: Strongly typed programming language.
- **Jest**: Testing framework for unit and integration tests.
- **Swagger**: API documentation for easy exploration and testing of endpoints.

## Project Highlights
- **Modular Architecture**: Each domain feature is encapsulated in its own module for better maintainability and scalability.
- **Comprehensive Testing**: Unit and E2E tests ensure reliability and code coverage.
- **Third-Party Integrations**: Easily integrates services such as logging and monitoring.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
