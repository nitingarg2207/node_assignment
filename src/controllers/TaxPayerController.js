const TaxRecord = require('../models/TaxRecord');
const User = require('../models/User');
async function viewTaxDues(panCard) {
  try {
    const taxPayer = await User.findOne({ username: panCard, role: 'tax-payer' });
    if (!taxPayer) {
      throw new Error('Tax payer not found');
    }
    const taxDues = await TaxRecord.find({ panCard });
    return taxDues;
  } catch (error) {
    throw new Error('Error viewing tax dues: ' + error.message);
  }
}

async function markTaxDueAsPaid(taxRecordId) {
  try {
    const taxRecord = await TaxRecord.findById(taxRecordId);

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
    throw new Error('Error marking tax due as paid: ' + error.message);
  }
}

module.exports = {
  viewTaxDues,
  markTaxDueAsPaid,
};
