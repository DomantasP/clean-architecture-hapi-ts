import * as Hapi from "hapi";
import { IServerConfigurations } from "../../config";
import { Db } from "mongodb";

export interface IPluginOptions {
  serverConfigs: IServerConfigurations;
}

export interface IPlugin {
  register(server: Hapi.Server, options?: IPluginOptions, database?: Db): Promise<void>;
  info(): IPluginInfo;
}

export interface IPluginInfo {
  name: string;
  version: string;
}
