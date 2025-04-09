// Load environment variables
require('dotenv').config({ path: '.env' });


console.log("NODE_MAILER_USER:", process.env.NODE_MAILER_USER);
console.log("NODE_MAILER_PASSWORD:", process.env.NODE_MAILER_PASSWORD);
// Import third-party packages
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const https = require('https');
const mongoose = require('mongoose');

// Import local files
const { MAX } = require('./src/constant');
const corsConfig = require('./src/configs/cors.config');
const accountApi = require('./src/apis/account.api');
const wordApi = require('./src/apis/word.api');


// ================== Set up Express ==================
const app = express();
const normalizePort = (port) => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 3000);

// ================== Middleware ==================
app.use(express.json({ limit: MAX.SIZE_JSON_REQUEST }));
app.use(express.urlencoded({ limit: MAX.SIZE_JSON_REQUEST }));
app.use(cookieParser());
app.use(cors(corsConfig));
app.options('*', cors(corsConfig)); // Đảm bảo OPTIONS request được xử lý

const dev = app.get('env') !== 'production';
if (!dev) {
  app.disable('x-powered-by');
  app.use(morgan('common'));
} else {
  app.use(morgan('dev'));
}

// ================== Connect MongoDB ==================
const MONGO_URL = dev ? process.env.MONGO_URL_LOCAL : process.env.MONGO_URL;
mongoose.connect(MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// ================== Define API Routes ==================
const BASE_URL = '/apis';
app.use(`${BASE_URL}/account`, accountApi);
app.use(`${BASE_URL}/word`, wordApi);

// ================== Kiểm tra API đang chạy ==================
app.get(`${BASE_URL}`, (req, res) => {
  res.json({ message: "API is working!" });
});

// ================== Serve Frontend (React) ==================
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Nếu API không tồn tại, trả về JSON thay vì React
app.use(`${BASE_URL}/*`, (req, res) => {
  res.status(404).json({ error: "API not found" });
});

// Serve frontend sau cùng
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// ================== Start Server ==================
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}/apis`);
});
