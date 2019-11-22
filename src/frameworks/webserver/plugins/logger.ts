import { IPlugin } from "./interfaces";
import * as Hapi from "hapi";
import * as laabr from "laabr";

export class Logger implements IPlugin {
  async register (server: Hapi.Server): Promise<void> {
    try {
      await server.register({
        plugin: laabr,
        options: {}
      });
    } catch (err) {
      console.log(`Error registering laabr plugin: ${err}`);
      throw err;
    }
  }

  info () {
    return { name: "Laabr", version: "1.0.0" };
  }
}
