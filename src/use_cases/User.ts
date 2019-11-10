import { IUserRepository } from "../interfaces/repositories/UserRepository";
import User from "../domain/entities/User";
export default class UserUseCases {
  readonly repository: IUserRepository;
  constructor (repository: IUserRepository) {
    this.repository = repository;
  }

  getUser (userId: string) {
    return this.repository.getUserById(userId);
  }

  createUser (user: User) {
    return this.repository.createUser(user);
  }
}
