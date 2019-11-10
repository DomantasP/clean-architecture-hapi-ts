import * as Hapi from "hapi";
import UserController from "../../interfaces/controllers/UserController";
// import * as UserValidator from "./user-validator";
import { IServerConfigurations } from "../../config";
import { UserRepository } from "../../interfaces/repositories/UserRepository";
import { Db } from "mongodb";

export default (
  server: Hapi.Server,
  serverConfigs: IServerConfigurations,
  database: Db
) => {
  const userRepository = new UserRepository(database);
  const userController = new UserController(userRepository);
  
  server.bind(userController);

  server.route({
    method: "GET",
    path: "/user",
    options: {
      handler: userController.getUser,
      // auth: "jwt",
      tags: ["api"],
      description: "Get user info.",
      // validate: {
      //   headers: UserValidator.jwtValidator
      // },
      plugins: {
        "hapi-swagger": {
          responses: {
            200: { description: "User founded." },
            401: { description: "Please login." }
          }
        }
      }
    }
  });

  server.route({
    method: "POST",
    path: "/user",
    options: {
      handler: userController.createUser,
      // auth: "jwt",
      tags: ["api"],
      description: "Create new user.",
      // validate: {
      //   headers: UserValidator.jwtValidator
      // },
      plugins: {
        "hapi-swagger": {
          responses: {
            200: { description: "User created." },
            401: { description: "Please login." }
          }
        }
      }
    }
  });
};
