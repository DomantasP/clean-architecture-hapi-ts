import * as Hapi from "hapi"

export interface ICredentials extends Hapi.AuthCredentials {
  userId: string;
}

export interface IRequestAuth extends Hapi.RequestAuth {
  credentials: ICredentials;
}

export interface IRequest extends Hapi.Request {
  auth: IRequestAuth;
}
