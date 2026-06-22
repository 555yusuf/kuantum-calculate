require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Veritabanı bağlantısı
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== [KUANTUM DEĞİŞİKLİK BAŞLANGICI: Frontend dosyalarını sunmak ve CORS izinlerini tanımlamak için] =====
const path = require('path');
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, token');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});
app.use(express.static(path.join(__dirname, 'public')));
// ===== [KUANTUM DEĞİŞİKLİK BİTİŞİ] =====

// Rotalar (Routes)
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/company', require('./routes/asset.routes'));



const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});