const mongoose = require('mongoose'); // Import mongoose for MongoDB interactions

// Define the schema for assignments
const AssignmentSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Assignment title (required)
  description: { type: String }, // Optional description of the assignment
  deadline: { type: Date, required: true }, // Deadline date (required)
  status: { 
    type: String, 
    enum: ['Pending', 'Completed'], // Only allow 'Pending' or 'Completed' as values
    default: 'Pending' // Default value is 'Pending'
  },
});

// Export the model for use in the application
module.exports = mongoose.model('Assignment', AssignmentSchema);
