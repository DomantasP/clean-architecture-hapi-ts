  
import * as Hapi from "hapi";
import { IServerConfigurations } from "../../config";
import Users from "./UserRoutes";
import { Db } from "mongodb";
import registerPlugins from "./plugins";

export async function init (configs: IServerConfigurations, database: Db): Promise<Hapi.Server> {
  const server = new Hapi.Server({
    debug: { request: ["error"] },
    host: configs.host || "localhost",
    port: process.env.PORT || configs.port,
    routes: {
      cors: {
        origin: ["*"]
      }
    }
  });

  console.log("Registering plugins");
  await registerPlugins(server, configs, database);

  console.log("Registering controllers");
  Users(server, configs, database);

  return server;
}
