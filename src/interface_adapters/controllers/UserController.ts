import { IUserRepository } from "../repositories/UserRepository";
import * as Request from "../requests/UserRequests";
import * as Hapi from "hapi";
import * as Boom from "@hapi/boom";
import User from "../../domain/entities/User";
import UserUseCases from "../../use_cases/UserUseCases";

export default

class UserController {
  readonly user: UserUseCases

  constructor (repository: IUserRepository) {
    this.user = new UserUseCases(repository);
  }

  async getUser (request: Request.IGetUserRequest, h: Hapi.ResponseToolkit) {
    return this.user.getUser(request.payload.id);
  }

  async createUser (request: Request.ICreateUser, h: Hapi.ResponseToolkit) {
    const user: User = request.payload;

    try {
      await this.user.createUser(user);
    } catch (e) {
      return Boom.badRequest(e.message);
    }

    return h.response().code(201);
  }
}
