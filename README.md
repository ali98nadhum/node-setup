# Node.js Project Setup

A simple Node.js project setup script that creates a basic project structure, installs essential dependencies, and sets up configuration files for an Express.js application.

## 🚀 Features

- Creates a project folder with the given name.
- Installs essential dependencies:
  - `express` for creating the server.
  - `cors` for handling Cross-Origin Resource Sharing.
  - `dotenv` for managing environment variables.
  - `mongoose` for MongoDB integration.
  - `nodemon` for automatic server restarts during development.
- Generates the following folder structure:
  - `src/config`: Contains database configuration.
  - `src/controllers`: Contains controller files.
  - `src/middlewares`: Contains middleware files.
  - `src/models`: Contains model files.
  - `src/routes`: Contains route files.
  - `src/utils`: Contains utility files.
- Creates necessary files:
  - `.gitignore`: Ignores `node_modules` and `.env`.
  - `config.env`: Includes environment variables for MongoDB and server configuration.
  - `src/index.js`: The entry point for the application.
  - A sample MongoDB connection setup in `src/config/db.js`.
  
