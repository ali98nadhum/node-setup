#!/usr/bin/env node
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const projectName = process.argv[2];
if (!projectName) {
  console.error("❌ Please provide a project name: setup-node my-project");
  process.exit(1);
}

const projectPath = path.join(process.cwd(), projectName);
if (fs.existsSync(projectPath)) {
  console.error("❌ Project folder already exists!");
  process.exit(1);
}
fs.mkdirSync(projectPath);
console.log(`📂 Created project folder: ${projectName}`);
process.chdir(projectPath);

function runCommand(command) {
  execSync(command, { stdio: "inherit" });
}

function createPackageJson() {
  console.log("📦 Initializing package.json...");
  runCommand("npm init -y");
}

function installDependencies() {
  console.log("⬇ Installing dependencies...");
  runCommand("npm install express cors dotenv mongoose --silent");
  runCommand("npm install -D nodemon --silent");
}

function createProjectStructure() {
  ["src", "src/config", "src/controllers", "src/middlewares", "src/models", "src/routes", "src/utils"].forEach((folder) => {
    fs.mkdirSync(folder, { recursive: true });
    console.log(`📁 Created folder: ${folder}`);
  });
}

function createBaseFiles() {
  const files = {
    "src/config/db.js": "const mongoose = require('mongoose');\n\nconst connectDB = async () => {\n  try {\n    await mongoose.connect(process.env.MONGO_URI, {\n      useNewUrlParser: true,\n      useUnifiedTopology: true,\n    });\n    console.log('✅ MongoDB Connected');\n  } catch (error) {\n    console.error('❌ MongoDB Connection Error:', error);\n    process.exit(1);\n  }\n};\n\nmodule.exports = connectDB;\n",
    "src/controllers/.gitKeep": "",
    "src/middlewares/.gitkeep": "",
    "src/models/.gitkeep": "",
    "src/routes/.gitkeep": "",
    "src/utils/.gitkeep": "",
    "src/index.js": "const express = require('express');\nconst cors = require('cors');\nconst dotenv = require('dotenv');\nconst connectDB = require('./config/db');\n\ndotenv.config();\nconnectDB();\n\nconst app = express();\napp.use(cors());\napp.use(express.json());\n\nconst PORT = process.env.PORT || 5000;\napp.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));\n"
  };


  for (const [filePath, content] of Object.entries(files)) {
    fs.writeFileSync(filePath, content);
    console.log(`📄 Created file: ${filePath}`);
  }
}

function updatePackageJson() {
  const packageJsonPath = path.join(projectPath, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath));
  packageJson.scripts = { start: "node src/index.js", dev: "nodemon src/index.js" };
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log("📦 Updated package.json with scripts");
}

function createEnvFiles() {
  fs.writeFileSync(".gitignore", "node_modules/\n.env\n");
  fs.writeFileSync("config.env", "PORT=5000\nMONGO_URI=your_mongodb_connection_string\n");
  console.log("📝 Created .gitignore and config.env files");
}

function setupProject() {
  createPackageJson();
  installDependencies();
  createProjectStructure();
  createBaseFiles();
  updatePackageJson();
  createEnvFiles();
  console.log("\n✅ Node.js project setup completed successfully!\n");
}

setupProject();
