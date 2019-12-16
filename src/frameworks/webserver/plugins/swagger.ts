import * as Hapi from "hapi"
import { IPlugin } from "./interfaces"
const Vision = require("@hapi/vision")
const Inert = require("@hapi/inert")
const Swagger = require("hapi-swagger")

export class SwaggerPlugin implements IPlugin {
  async register (server: Hapi.Server): Promise<void> {
    try {
      return server.register([
        Inert,
        Vision,
        {
          plugin: Swagger,
          options: {
            info: {
              title: "Task Api",
              description: "Task Api Documentation",
              version: "1.0"
            },
            tags: [
              {
                name: "user",
                description: "Api users interface."
              }
            ],
            swaggerUI: true,
            documentationPage: true,
            documentationPath: "/docs"
          }
        }
      ])
    } catch (err) {
      console.log(`Error registering swagger plugin: ${err}`)
    }
  }

  info () {
    return { name: "Swagger Documentation", version: "1.0.0" }
  }
}
