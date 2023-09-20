const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const TaxPayerController = require('../controllers/TaxPayerController');

const router = express.Router();
const taxpayerController = new TaxPayerController();

router.get('/tax-dues/:panCard', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'tax-payer' || req.user.username !== req.params.panCard) {
      return res.status(403).json({ error: 'Forbidden: Access denied' });
    }

    const taxDues = await taxpayerController.viewTaxDues(req.params.panCard);
    res.status(200).json(taxDues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/mark-tax-due-paid/:taxRecordId', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'tax-payer' || req.user.username !== req.params.panCard) {
      return res.status(403).json({ error: 'Forbidden: Access denied' });
    }

    const taxRecord = await taxpayerController.markTaxDueAsPaid(req.params.taxRecordId);
    res.status(200).json(taxRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
