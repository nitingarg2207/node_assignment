const mongoose = require('mongoose');

// Define the TaxRecord schema
const taxRecordSchema = new mongoose.Schema({
  panCard: {
    type: String,
    required: true,
    unique: true, // Ensures PAN cards are unique
  },
  incomeSalary: {
    type: Number,
    required: true,
  },
  incomeShareMarket: {
    type: Number,
    required: true,
  },
  stateTax: {
    type: Number,
    required: true,
  },
  centralTax: {
    type: Number,
    required: true,
  },
  gstType: {
    type: String,
    enum: ['State', 'Union Territory'],
    required: true,
  },
  arrears: {
    type: Number,
    default: 0,
  },
  fines: {
    type: Number,
    default: 0,
  },
  totalTax: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['NEW', 'PAID', 'DELAYED'],
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User who created this TaxRecord
  },
});

// Create the TaxRecord model
const TaxRecord = mongoose.model('TaxRecord', taxRecordSchema);

module.exports = TaxRecord;
