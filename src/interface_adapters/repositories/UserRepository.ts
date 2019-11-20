import IUserRepository from "../../application/repositories/IUserRepository";
import User from "../../domain/entities/User";
import * as bcrypt from "bcrypt";
export default

class UserRepository implements IUserRepository {
  readonly database: any;
  readonly user: any;

  constructor (database: any) {
    this.database = database;
    this.user = this.database.collection("user");
  }

  public async doesUserExist (id: string): Promise<boolean> {
    const user = await this.user.findOne({ _id: id }, { _id: 1 });
    return !!user;
  }

  public async doesUserEmailExist (email: string): Promise<boolean> {
    const user = await this.user.findOne({ email }, { _id: 1 });
    return !!user;
  }

  public async getUserById (id: string): Promise<User> {
    return this.user.findOne({ _id: id });
  }

  public async createUser (user: User): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(user.password, salt);
    
    user.password = passwordHash;
    return this.user.insertOne(user);
  }

  public async verifyPassword (email: string, password: string): Promise<{ isValid: boolean, user: User}> {
    const user = await this.user.findOne({ email });

    const isValid = bcrypt.compareSync(password, user.password);

    return { isValid, user };
  }
}
