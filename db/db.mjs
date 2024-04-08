// db.mjs
import { MongoClient } from "mongodb";

const connectionString = process.env.mongoURI || "";
const client = new MongoClient(connectionString, {
   useNewUrlParser: true, 
   useUnifiedTopology: true,
  });

async function connectToDatabase(callback) {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    callback(null, client.db("sample_training"));
  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
    callback(e);
  }
}

export default connectToDatabase;
