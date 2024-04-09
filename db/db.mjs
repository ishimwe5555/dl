// db.mjs
import mongoose from "mongoose";

const connectionString = process.env.mongoURI || "";

async function connectToDatabase() {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      dbName: 'sample_training' // Specify the database name
   
     });
    console.log("Connected to MongoDB");
    return mongoose.Connection;
  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
    //callback(e);
  }
}

export default connectToDatabase;
