const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/crud-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Routes
const itemsRouter = require('./routes/items');
app.use('/api/items', itemsRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
