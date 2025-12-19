const { MongoClient, ServerApiVersion } = require("mongodb");

export function GET() {
  return Response.json({
    message: "Api Running Now",
  });
}

// Mongodb Connect
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
