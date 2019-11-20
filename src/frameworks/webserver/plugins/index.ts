import { SwaggerPlugin } from "./swagger";
import { JwtAuth } from "./jwt-auth";
import * as Hapi from "hapi";
import { IPlugin } from "./interfaces";
import { IServerConfigurations } from "../../config";
import { Db } from "mongodb";

const plugins: Array<IPlugin> = [
  new SwaggerPlugin(),
  new JwtAuth()
];

export default async (server: Hapi.Server, serverConfigs: IServerConfigurations, database: Db) => {
  const registeredPlugins = plugins.map(plugin => plugin.register(server, { serverConfigs }, database));

  await Promise.all(registeredPlugins);
};
