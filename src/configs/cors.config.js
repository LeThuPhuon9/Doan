require('dotenv').config();
const express = require('express');
const app = express();

const dev = app.get('env') !== 'production';

const corsConfig = {
  // Chỉ định các domain được phép truy cập API
  origin: dev
    ? ['http://localhost:8888', 'http://localhost:3000'] // Chạy local
    : process.env.CORS_ORIGIN || '*', // Chạy production

  // Cho phép các phương thức HTTP
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],

  // Cho phép các headers cụ thể
  allowedHeaders: [
    'X-Requested-With',
    'X-HTTP-Method-Override',
    'Content-Type',
    'Accept',
    'Authorization',
  ],

  // Cho phép gửi cookie và xác thực
  credentials: true,

  // Cho phép client đọc các headers này từ response
  exposedHeaders: ['Content-Range', 'X-Content-Range', 'Authorization'],

  // Trả về thành công cho OPTIONS request
  optionsSuccessStatus: 200,
};

module.exports = corsConfig;
