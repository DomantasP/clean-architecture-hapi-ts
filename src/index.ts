import * as Server from "./frameworks/webserver/server";
import * as Database from "./frameworks/database/database";
import * as Configs from "./frameworks/config";

const dbConfigs = Configs.getDatabaseConfig();
const serverConfigs = Configs.getServerConfigs();

console.log(`Running environment ${process.env.NODE_ENV || "dev"}`);

// Catch unhandling unexpected exceptions
process.on("uncaughtException", (error: Error) => {
  console.error(`uncaughtException ${error.message}`);
});

// Catch unhandling rejected promises
process.on("unhandledRejection", (error: any) => {
  console.error(`unhandledRejection ${error.message}`);
});

// Define async start function
const start = async ({ config }) => {
  try {
    const database = await Database.init(dbConfigs);
    const server = await Server.init(config, database);
    await server.start();
    console.log("Server running at:", server.info.uri);
  } catch (err) {
    console.error("Error starting server: ", err.message);
    throw err;
  }
};

// Starting Application Server

// Start the server
start({ config: serverConfigs });
