
import express from 'express';
import multer from 'multer'; // For handling file uploads
import fs from 'fs';
import path from 'path';
import Application from '../models/appModel.mjs';

const router = express.Router();
// Ensure the destination directory exists
const destinationDir = 'assets/';
if (!fs.existsSync(destinationDir)) {
  fs.mkdirSync(destinationDir);
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, destinationDir); // Specify the destination directory
  },
  filename: function (_req, file, cb) {
    const email = _req.body.email || 'unkown@';
    // Extract characters preceding the "@" symbol
    const username = email.split('@')[0];
    // Generate a unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileName = `${username}-${uniqueSuffix}${path.extname(file.originalname)}`;
    cb(null, fileName); // Use the original filename with a unique suffix
  },
});

// Multer upload instance with storage configuration
const upload = multer({ storage: storage });

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

  // Add an application with resume upload
router.post('/', upload.single('resume'), async (req, res) => {
    try {
        const { firstName, lastName, dob, gender, email,yearsOfExperience,otherDetails } = req.body;
         // Check if multer failed to save the file
    // if (!req.file || !req.file.path) {
    //     throw new Error('No file uploaded or file path not provided.');
    //   }
        let resumePath = null;
        if(req.file){
            resumePath = req.file.path; // Get the path of the uploaded resume file
        }

        // Create new application instance with resume
        const newApplication = new Application({ firstName, lastName, dob, gender, email,yearsOfExperience,otherDetails ,resume: resumePath });
        // Save the application to the database
        await newApplication.save();
        //fs.writeFileSync(`${username}_resume.pdf`, resume);
        console.log('Resume saved to resume.pdf');
        res.status(201).json(newApplication);
    } catch (error) {
        console.error('Error adding application:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Find an Application document (example: by email)
//const application = await Application.findOne({ email: 'applicant@example.com' });

// Access resume buffer
//const resumeBuffer = application.resume;

//   // Upload resume file
// router.post('/upload-resume', upload.single('resume'), async (req, res) => {
//     try {
//         const { buffer } = req.file; // Get the buffer containing file data
//         // Create new application record with resume data
//         const newApplication = new Application({ resume: buffer });
//         await newApplication.save();
//         res.status(201).send('Resume uploaded successfully');
//     } catch (error) {
//         console.error('Error uploading resume:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

    // Add an application
// router.post('/', async (req, res) => {
//     try {
//         const { firstName, lastName, dob, gender, email } = req.body;
//         // Create new application instance
//         const newApplication = new Application({ firstName, lastName, dob, gender, email });
//         // Save the application to the database
//         await newApplication.save();
//         res.status(201).json(newApplication);
//     } catch (error) {
//         console.error('Error adding application:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

  export default router;