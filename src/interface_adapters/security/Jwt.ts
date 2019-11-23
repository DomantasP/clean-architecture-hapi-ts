import IToken from "../../application/security/IToken"
import * as JwtLib from "jsonwebtoken"
export default

class Jwt implements IToken {
  private readonly secret: string;
  private readonly expirationTime: number;

  constructor (secret: string, expirationTime: number) {
    this.secret = secret
    this.expirationTime = expirationTime
  }

  public generate (payload: object): Promise<string> {
    return JwtLib.sign(payload, this.secret, { expiresIn: this.expirationTime })
  }

  public decode (token: string): Promise<{ userId: string}> {
    return JwtLib.verify(token, this.secret)
  }
}
