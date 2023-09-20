const TaxRecord = require('../models/TaxRecord');
async function listAllTaxRecords() {
  try {
    const taxRecords = await TaxRecord.find();
    return taxRecords;
  } catch (error) {
    throw new Error('Error listing tax records: ' + error.message);
  }
}
async function viewTaxRecordById(id) {
  try {
    const taxRecord = await TaxRecord.findById(id);
    if (!taxRecord) {
      throw new Error('Tax record not found');
    }
    return taxRecord;
  } catch (error) {
    throw new Error('Error viewing tax record: ' + error.message);
  }
}
async function markTaxRecordAsPaid(id) {
  try {
    const taxRecord = await TaxRecord.findById(id);
    if (!taxRecord) {
      throw new Error('Tax record not found');
    }
    if (taxRecord.status === 'PAID') {
      throw new Error('Tax record is already marked as paid');
    }
    taxRecord.status = 'PAID';
    await taxRecord.save();

    return taxRecord;
  } catch (error) {
    throw new Error('Error marking tax record as paid: ' + error.message);
  }
}

module.exports = {
  listAllTaxRecords,
  viewTaxRecordById,
  markTaxRecordAsPaid,
};
