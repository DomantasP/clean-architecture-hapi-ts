import IUserRepository from "../../application/repositories/IUserRepository";
import * as Request from "../requests/UserRequests";
import * as Hapi from "hapi";
import * as Boom from "@hapi/boom";
import User from "../../domain/entities/User";
import UserUseCases from "../../application/use_cases/UserUseCases";
import { ValidationError, AuthorizationError } from "../../application/errors/Errors";
import Jwt from "../security/Jwt";
import { IServerConfigurations } from "../../frameworks/config";

export default

class UserController {
  private readonly user: UserUseCases
  private readonly configs: IServerConfigurations

  constructor (repository: IUserRepository, configs: IServerConfigurations) {
    const jwtToken = new Jwt(configs.jwtSecret, parseInt(configs.jwtExpiration));
    this.user = new UserUseCases(repository, jwtToken);
    this.configs = configs;
  }

  public async getUser (request: Request.IGetUserRequest, h: Hapi.ResponseToolkit) {
    return this.user.getUser(request.payload.id);
  }

  public async createUser (request: Request.ICreateUser, h: Hapi.ResponseToolkit) {
    const user: User = request.payload;

    try {
      await this.user.createUser(user);
    } catch (e) {
      if (e instanceof ValidationError) return Boom.badRequest(e.message);
      else return Boom.internal();
    }

    return h.response().code(201);
  }

  public async login (request: Request.ILoginRequest, h: Hapi.ResponseToolkit) {
    const { email, password } = request.payload;

    try {
      const token = await this.user.getToken(email, password);
    
      return { token, email };
    } catch (e) {
      if (e instanceof AuthorizationError) return Boom.unauthorized();
      else return Boom.internal();
    }
  }
}
