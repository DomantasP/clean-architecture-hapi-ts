import { IUserRepository } from "../repositories/UserRepository";
import * as Request from "../requests/UserRequests";
import * as Hapi from "hapi";
import User from "../../domain/entities/User";
import UserUseCases from "../../use_cases/User";

export default

class UserController {
  readonly user: UserUseCases

  constructor (repository: IUserRepository) {
    this.user = new UserUseCases(repository);
  }

  async getUser (request: Request.IGetUserRequest, h: Hapi.ResponseToolkit) {
    return this.user.getUser(request.payload.id);
  }

  async createUser (request: Request.ICreateUser) {
    const user: User = request.payload;

    return this.user.createUser(user);
  }
}
