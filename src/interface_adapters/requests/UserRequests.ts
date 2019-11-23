import * as Hapi from "hapi"
import { IRequest } from "./IRequest"

export interface IGetUserRequest extends Hapi.Request {
  payload: {
    id: string;
  };
}

export interface ICreateUser extends Hapi.Request {
  payload: {
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ILoginRequest extends IRequest {
  payload: {
    email: string;
    password: string;
  };
}
