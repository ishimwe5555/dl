// seed.js
import mongoose from 'mongoose';
import Application from '../../models/appModel.mjs'; // Adjust the path to your model file

// Define seed data
const seedData = [
  {
    firstName: 'John',
    lastName: 'Doe',
    dob: new Date('1990-01-01'),
    email: 'john@example.com',
    gender: 'Male',
    yearsOfExperience: 5,
    //resume: Buffer.from('Resume data here'), // Adjust as needed
  },  {
    firstName: 'John',
    lastName: 'Doe',
    dob: new Date('1990-01-01'),
    email: 'john@example.com',
    gender: 'Male',
    yearsOfExperience: 5,
    //resume: Buffer.from('Resume data here'), // Adjust as needed
  },  {
    firstName: 'John',
    lastName: 'Doe',
    dob: new Date('1990-01-01'),
    email: 'john@example.com',
    gender: 'Male',
    yearsOfExperience: 5,
    //resume: Buffer.from('Resume data here'), // Adjust as needed
  },  {
    firstName: 'John',
    lastName: 'Doe',
    dob: new Date('1990-01-01'),
    email: 'john@example.com',
    gender: 'Male',
    yearsOfExperience: 5,
    //resume: Buffer.from('Resume data here'), // Adjust as needed
  },
  // Add more seed data as needed
];

// Connect to MongoDB
//mongoose.connect('mongodb://localhost:27017/your_database_name', { useNewUrlParser: true, useUnifiedTopology: true });

// Insert seed data
async function seedDatabase() {
  try {
    await Application.insertMany(seedData);
    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close(); // Close the database connection
  }
}

seedDatabase();
