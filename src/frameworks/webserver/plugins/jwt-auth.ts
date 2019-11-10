import { IPlugin, IPluginOptions } from "./interfaces";
import * as Hapi from "hapi";
import { IUserRepository, UserRepository } from "../../../interfaces/repositories/UserRepository";
import { Db } from "mongodb";

export class JwtAuth implements IPlugin {
  async register (server: Hapi.Server, options: IPluginOptions, database: Db): Promise<void> {
    try {
      await server.register(require("hapi-auth-jwt2"));

      const repository = new UserRepository(database);

      return setAuthStrategy(server, {
        config: options.serverConfigs,
        validate: validateUser(repository)
      });
    } catch (err) {
      console.log(`Error registering jwt plugin: ${err}`);
      throw err;
    }
  }

  info () {
    return { name: "JWT Authentication", version: "1.0.0" };
  }
}

const validateUser = async (repository: IUserRepository) => {
  return async (decoded: any) => {
    const exists = await repository.doesUserExist(decoded.id);

    if (!exists) return { isValid: false };
    return { isValid: true };
  };
};

const setAuthStrategy = async (server, { config, validate }) => {
  server.auth.strategy("jwt", "jwt", {
    key: config.jwtSecret,
    validate,
    verifyOptions: {
      algorithms: ["HS256"]
    }
  });

  server.auth.default("jwt");
};
