
import express from 'express';
import multer from 'multer'; // For handling file uploads
import Application from '../models/appModel.mjs';

const router = express.Router();
const upload = multer(); // Initialize multer instance

// Get all apps
router.get('/apps', async (req, res) => {
    try {
      const applications = await Application.find();
      res.json(applications);
    } catch (error) {
        console.error('Error fetching applications:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Upload resume file
router.post('/upload-resume', upload.single('resume'), async (req, res) => {
    try {
        const { buffer } = req.file; // Get the buffer containing file data
        // Create new application record with resume data
        const newApplication = new Application({ resume: buffer });
        await newApplication.save();
        res.status(201).send('Resume uploaded successfully');
    } catch (error) {
        console.error('Error uploading resume:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

    // Add an application
router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, dob, gender, email } = req.body;
        // Create new application instance
        const newApplication = new Application({ firstName, lastName, dob, gender, email });
        // Save the application to the database
        await newApplication.save();
        res.status(201).json(newApplication);
    } catch (error) {
        console.error('Error adding application:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

  export default router;