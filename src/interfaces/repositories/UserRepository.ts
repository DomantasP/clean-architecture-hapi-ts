import User from "../../domain/entities/User";

export interface IUserRepository {
  getUserById(id: string): Promise<User>
  createUser (user: User): Promise<User>
  doesUserExist (id: string): Promise<boolean>
}

export class UserRepository implements IUserRepository {
  readonly database: any;
  readonly user: any;

  constructor (database: any) {
    this.database = database;
    this.user = this.database.collection("user");
  }

  async doesUserExist (id: string): Promise<boolean> {
    const user = await this.user.findOne({ _id: id }, { _id: 1 });
    return !!user;
  }

  async getUserById (id: string): Promise<User> {
    return this.user.findOne({ _id: id });
  }

  async createUser (user: User): Promise<User> {
    return this.user.insert(user);
  }
}
