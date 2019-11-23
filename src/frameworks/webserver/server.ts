  
import * as Hapi from "hapi"
import * as Boom from "@hapi/boom"
import { IServerConfigurations } from "../config"
import Users from "./UserRoutes"
import { Db } from "mongodb"
import registerPlugins from "./plugins"

export async function init (configs: IServerConfigurations, database: Db): Promise<Hapi.Server> {
  const server = new Hapi.Server({
    debug: { request: ["error"] },
    host: configs.host || "localhost",
    port: process.env.PORT || configs.port,
    routes: {
      cors: {
        origin: ["*"]
      },
      validate: {
        failAction: async (request, h, err) => {
          if (process.env.NODE_ENV === "production") {
            // In prod, log a limited error message and throw the default Bad Request error.
            console.error("ValidationError:", err.message)
            throw Boom.badRequest("Invalid request payload input")
          } else {
            // During development, log and respond with the full error.
            console.error(err)
            throw err
          }
        }
      }
    }
  })

  server.log("Registering plugins")
  await registerPlugins(server, configs, database)

  console.log("Registering controllers")
  Users(server, configs, database)

  return server
}
