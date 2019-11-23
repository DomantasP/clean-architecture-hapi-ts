import { IPlugin } from "./interfaces"
import * as Hapi from "hapi"
import * as laabr from "laabr"

export class Logger implements IPlugin {
  async register (server: Hapi.Server): Promise<void> {
    try {
      await server.register({
        plugin: laabr,
        options: {
          formats: {
            onPostStart: ":time[utc] :start :level :message",
            response: "{time::time[utc], method::method, origin::remoteAddress, url::url, status::status, environemnt::environment, message::message}",
            log: "{ time::time[utc] :environment :host :host[port] }"
          },
          tokens: { start: () => "[start]" },
          indent: 0,
          hapiPino: {
            logPayload: false
          },
          pino: {
            timestamp: false
          }
        }
      })
    } catch (err) {
      console.log(`Error registering laabr plugin: ${err}`)
      throw err
    }
  }

  info () {
    return { name: "Laabr", version: "1.0.0" }
  }
}
