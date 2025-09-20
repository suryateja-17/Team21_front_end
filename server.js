const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'dist')));

// Routes
app.use('/api/auth', require('./routes/authRoute'));
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/taxes", require("./routes/taxRoutes"));
app.use("/api/coa", require("./routes/coaRoutes"));
app.use("/api/purchase-orders", require("./routes/purchaseRoutes"));
app.use("/api/sales-orders", require("./routes/salesRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Basic health check route
app.get('/api', (req, res) => {
  res.json({ message: 'Shiv Furniture API Server is running!' });
});

// Serve React app for all non-API routes
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Handle 404 for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
