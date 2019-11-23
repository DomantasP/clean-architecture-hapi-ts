import IUserRepository from "../repositories/IUserRepository"
import { ValidationError, AuthorizationError } from "../errors/Errors"
import User from "../../domain/entities/User"
import IToken from "../security/IToken"

export default class UserUseCases {
  private readonly repository: IUserRepository;
  private readonly token: IToken;

  constructor (repository: IUserRepository, token: IToken) {
    this.repository = repository
    this.token = token
  }

  public getUser (userId: string) {
    return this.repository.getUserById(userId)
  }

  public async createUser (user: User): Promise<void> {
    const userExists = await this.repository.doesUserEmailExist(user.email)

    if (userExists) throw new ValidationError(`User ${user.email} already exists.`)

    await this.repository.createUser(user)
  }

  public async getToken (email: string, password: string): Promise<string> {
    const { isValid, user } = await this.repository.verifyPassword(email, password)
    
    if (!isValid) throw new AuthorizationError()

    return this.token.generate({ userId: user._id.toString() })
  }
}
