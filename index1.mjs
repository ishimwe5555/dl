const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
// Load environment variables
import "./loadEnvironment.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// MongoDB connection URL
const mongoURI = "mongodb+srv://ishimwe:d2acTRR0aTnwGAsv@chatsdlcluster.pgleis6.mongodb.net/?retryWrites=true&w=majority&appName=chatsdlCluster";


// Connect to MongoDB
MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }
  console.log('Connected to MongoDB');

  const db = client.db('chatsdl'); // Replace 'my_database' with your database name

  // Endpoint to handle form submissions
  app.post('/submit-form', (req, res) => {
    const formData = req.body;

    // Insert form data into MongoDB collection
    db.collection('forms').insertOne(formData, (err, result) => {
      if (err) {
        console.error('Error inserting form data into MongoDB:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      console.log('Form data inserted into MongoDB:', result.ops[0]);
      res.status(200).json({ message: 'Form submitted successfully' });
    });
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
