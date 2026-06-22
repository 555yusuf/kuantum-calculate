require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Veritabanı bağlantısı
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotalar (Routes)
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/company', require('./routes/asset.routes'));



const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});