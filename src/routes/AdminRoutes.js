const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const AdminController = require('../controllers/AdminController');

const router = express.Router();
const adminController = new AdminController();

router.get('/tax-records', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Access denied' });
    }

    const taxRecords = await adminController.listAllTaxRecords();
    res.status(200).json(taxRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/tax-records/:taxRecordId', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Access denied' });
    }

    const taxRecordId = req.params.taxRecordId;
    const taxRecord = await adminController.viewTaxRecordById(taxRecordId);

    res.status(200).json(taxRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
