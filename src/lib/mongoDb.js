import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DBNAME;

// if (!uri) {
//   throw new Error("❌ MONGODB_URI is missing");
// }

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// let isConnected = false;

export const dbConnect = async (collectionName) => {
  console.log(collectionName);

  //   if (!isConnected) {
  //     await client.connect();
  //     isConnected = true;
  //   }
  return client.db(dbName).collection(collectionName);
};
