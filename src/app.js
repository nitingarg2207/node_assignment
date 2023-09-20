const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();

mongoose.connect('mongodb://localhost/taxApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const adminRoutes = require('./routes/AdminRoutes');
const accountantRoutes = require('./routes/AccountantRoutes');
const taxpayerRoutes = require('./routes/TaxPayerRoutes');

app.use('/admin', adminRoutes);
app.use('/accountant', accountantRoutes);
app.use('/taxpayer', taxpayerRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
