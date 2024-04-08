
import express from 'express';
const router = express.Router();

// This will help us connect to the database
import connectToDatabase from "../db/db.mjs";


// Get a list of 50 posts
router.get("/", async (req, res) => {
    //const db = await connectToDatabase();
    let collection = await db.collection("applications");
    let results = await collection.find({})
      .limit(50)
      .toArray();
    res.send(results).status(200);
  });

// Fetches the latest applications
router.get("/latest", async (req, res) => {
    let collection = await db.collection("applications");
    let results = await collection.aggregate([
      {"$project": {"name": 1, "email": 1, "date": 1}},
      {"$sort": {"date": -1}},
      {"$limit": 3}
    ]).toArray();
    res.send(results).status(200);
  });

  // Get a single post
router.get("/:id", async (req, res) => {
    let collection = await db.collection("applications");
    let query = {_id: ObjectId(req.params.id)};
    let result = await collection.findOne(query);
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  });

  // Add a new document to the collection
router.post("/", async (req, res) => {
    let collection = await db.collection("applications");
    let newDocument = req.body;
    newDocument.date = new Date();
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  });

  export default router;