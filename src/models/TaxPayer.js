const mongoose = require('mongoose');

// Define the TaxPayer schema
const taxPayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  panCard: {
    type: String,
    required: true,
    unique: true, // Ensures PAN card numbers are unique
  },
  accountant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (assuming User is the model name for tax accountants)
    required: true,
  },
});

// Create the TaxPayer model
const TaxPayer = mongoose.model('TaxPayer', taxPayerSchema);

module.exports = TaxPayer;
