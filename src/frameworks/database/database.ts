import { IDataConfiguration } from "../config";
import { MongoClient, Db } from "mongodb";

export async function init (config: IDataConfiguration): Promise<Db> {
  const connectionUrl = process.env.MONGO_URL || config.connectionString;

  try {
    const client = await MongoClient.connect(connectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`Connected to database: ${connectionUrl}`);

    return client.db();
  } catch (e) {
    console.log(`Connection to ${connectionUrl} failed.`);
    throw e;
  }
}
