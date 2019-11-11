import { IUserRepository } from "../interface_adapters/repositories/UserRepository";
import User from "../domain/entities/User";

export default class UserUseCases {
  readonly repository: IUserRepository;
  constructor (repository: IUserRepository) {
    this.repository = repository;
  }

  getUser (userId: string) {
    return this.repository.getUserById(userId);
  }

  async createUser (user: User): Promise<void> {
    const userExists = await this.repository.doesUserEmailExist(user.email);

    if (userExists) throw new Error(`User with ${user.email} already exists.`);

    await this.repository.createUser(user);
  }
}
