class TaxService {
  calculateTotalTax(taxRecord) {
    if (taxRecord.gstType === 'State') {
      taxRecord.stateTax = taxRecord.incomeSalary * 0.1; // Adjust the tax calculation logic as needed
    } else if (taxRecord.gstType === 'Union Territory') {
      taxRecord.stateTax = 0;
    } else {
      throw new Error('Invalid GST type');
    }
    taxRecord
    .centralTax = taxRecord.incomeShareMarket * 0.05
    taxRecord.totalTax = taxRecord.stateTax + taxRecord.centralTax;
    return taxRecord;
  }
}

module.exports = new TaxService();
