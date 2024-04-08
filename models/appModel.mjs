import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: Date, required: true },
  email: { type: String, required: true },
  gender: { type: String, required: true },
  yearsOfExperience :{ type: Number, required: false },
  //resume:{ type: Buffer, required: false },
  // Add more fields as per your app requirements
});
const Application = mongoose.model('Application', applicationSchema);

export default Application;
