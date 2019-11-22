import { IPlugin, IPluginOptions } from "./interfaces";
import * as Hapi from "hapi";
import UserRepository from "../../../interface_adapters/repositories/UserRepository";
import { Db } from "mongodb";

export class JwtAuth implements IPlugin {
  async register (server: Hapi.Server, options: IPluginOptions, database: Db): Promise<void> {
    try {
      await server.register(require("hapi-auth-jwt2"));

      const repository = new UserRepository(database);

      const validateUser = async (decoded: any) => {
        const exists = await repository.doesUserExist(decoded.userId);
      
        if (!exists) return { isValid: false };
        return { isValid: true };
      };

      server.auth.strategy("jwt", "jwt", {
        key: options.serverConfigs.jwtSecret,
        validate: validateUser,
        verifyOptions: { algorithms: ["HS256"] }
      });
    
      server.auth.default("jwt");
    } catch (err) {
      console.log(`Error registering jwt plugin: ${err}`);
      throw err;
    }
  }

  info () {
    return { name: "JWT Authentication", version: "1.0.0" };
  }
}
