const TaxRecord = require('../models/TaxRecord');
const User = require('../models/User');
const TaxService = require('../services/TaxService');

async function createTaxDue(panCard, incomeSalary, incomeShareMarket, gstType, dueDate) {
  try {
    const taxPayer = await User.findOne({ username: panCard, role: 'tax-payer' });
    if (!taxPayer) {
      throw new Error('Tax payer not found');
    }
    const taxRecord = new TaxRecord({
      panCard,
      incomeSalary,
      incomeShareMarket,
      stateTax: 0,
      centralTax: 0,
      gstType,
      arrears: 0,
      fines: 0,
      dueDate,
      status: 'NEW',
    });

    TaxService.calculateTotalTax(taxRecord);
    await taxRecord.save();

    return taxRecord;
  } catch (error) {
    throw new Error('Error creating tax due: ' + error.message);
  }
}

async function editTaxDue(taxRecordId, updatedData) {
  try {
    const taxRecord = await TaxRecord.findById(taxRecordId);

    if (!taxRecord) {
      throw new Error('Tax record not found');
    }

    if (taxRecord.status === 'PAID') {
      throw new Error('Cannot edit a paid tax record');
    }

    Object.assign(taxRecord, updatedData);

    TaxService.calculateTotalTax(taxRecord);

    await taxRecord.save();

    return taxRecord;
  } catch (error) {
    throw new Error('Error editing tax due: ' + error.message);
  }
}

module.exports = {
  createTaxDue,
  editTaxDue,
};
