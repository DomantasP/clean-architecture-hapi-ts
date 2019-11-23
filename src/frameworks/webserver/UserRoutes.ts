import * as Hapi from "hapi"
import UserController from "../../interface_adapters/controllers/UserController"
import * as UserValidator from "../../interface_adapters/validators/UserValidator"
import { IServerConfigurations } from "../config"
import UserRepository from "../../interface_adapters/repositories/UserRepository"
import { Db } from "mongodb"

export default (
  server: Hapi.Server,
  serverConfigs: IServerConfigurations,
  database: Db
) => {
  const userRepository = new UserRepository(database)
  const userController = new UserController(userRepository, serverConfigs)

  server.bind(userController)

  server.route({
    method: "GET",
    path: "/user",
    options: {
      handler: userController.getUser,
      auth: "jwt",
      tags: ["api"],
      description: "Get user info.",
      plugins: {
        "hapi-swagger": {
          responses: {
            200: { description: "User founded." },
            401: { description: "Please login." }
          }
        }
      }
    }
  })

  server.route({
    method: "POST",
    path: "/user",
    options: {
      auth: false,
      handler: userController.createUser,
      tags: ["api"],
      description: "Create new user.",
      validate: {
        payload: UserValidator.createUser
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            201: { description: "User created." },
            400: { description: "Please login." }
          }
        }
      }
    }
  })

  server.route({
    method: "POST",
    path: "/auth",
    options: {
      auth: false,
      handler: userController.login,
      tags: ["api", "user"],
      description: "Authenticate.",
      validate: { payload: UserValidator.authUser },
      plugins: {
        "hapi-swagger": {
          responses: {
            201: { description: "User created." },
            400: { description: "Please login." },
            401: { description: "Incorrect credentials." }
          }
        }
      }
    }
  })
};
