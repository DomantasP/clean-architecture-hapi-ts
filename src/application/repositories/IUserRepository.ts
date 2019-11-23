import User from "../../domain/entities/User"

export default interface IUserRepository {
  getUserById(id: string): Promise<User>
  createUser (user: User): Promise<User>
  doesUserExist (id: string): Promise<boolean>
  doesUserEmailExist (email: string): Promise<boolean>
  verifyPassword (email: string, password: string): Promise<{ isValid: boolean, user: User}>
}
