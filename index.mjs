// Loads the configuration from config.env to process.env
import express, { json } from "express";
import cors from "cors";
// get MongoDB driver connection
import "./loadEnv.mjs";
import connectToDatabase from "./db/db.mjs";
import applicationsControllerr from './controllers/appController.mjs'; // Import the routes module

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(json());
app.use('/api/v1/', applicationsControllerr);

// Global error handling
app.use(function (err, _req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
// perform a database connection when the server starts
connectToDatabase(function (err) {
  if (err) {
    console.error('No connection',err);
    process.exit();
  }

  // start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});