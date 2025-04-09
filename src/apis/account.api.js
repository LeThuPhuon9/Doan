// const express = require('express');
// const accountApi = express.Router();
// const accountController = require('../controllers/account.controller');
// const passport = require('passport');
// const passportConfig = require('../middlewares/passport.middleware');

// // ================== Định nghĩa API ==================

// // Đăng ký tài khoản
// accountApi.post('/register', accountController.postRegisterAccount);

// // Đăng nhập
// accountApi.post('/login', accountController.postLogin);
// accountApi.post('/logout', accountController.postLogout);

// // Đăng nhập bằng Google
// // accountApi.post(
// //   '/login-gg',
// //   passport.authenticate('google-token', { session: false }),
// //   accountController.postLoginSocialNetwork,
// // );
// app.post("/account/login-gg", async (req, res) => {
//   const { token } = req.body;
//   const userData = await verifyToken(token);

//   if (!userData) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   res.json({ message: "Login successful", user: userData });
// });
// // accountApi.post(
// //   '/login-gg',
// //   passport.authenticate('google-token', { session: false }),
// //   accountController.postLoginSocialNetwork
// // );



// // Đăng nhập bằng Facebook
// accountApi.post(
//   '/login-fb',
//   passport.authenticate('facebook-token', { session: false }),
//   accountController.postLoginSocialNetwork,
// );

// // Quên mật khẩu & đặt lại mật khẩu
// accountApi.post('/reset-password', accountController.postResetPassword);

// // Cập nhật thông tin người dùng
// accountApi.put('/toggle-favorite', accountController.putToggleFavorite);
// accountApi.put(
//   '/update-coin',
//   passportConfig.jwtAuthentication,
//   accountController.putUpdateUserCoin,
// );
// accountApi.put(
//   '/update-avt',
//   passportConfig.jwtAuthentication,
//   accountController.putUpdateAvt,
// );
// accountApi.put(
//   '/update-profile',
//   passportConfig.jwtAuthentication,
//   accountController.putUpdateProfile,
// );

// // Lấy thông tin người dùng
// accountApi.get(
//   '/user-info',
//   passportConfig.jwtAuthentication,
//   accountController.getUserInfo,
// );
// accountApi.get('/send-verify-code', accountController.getVerifyCode);
// accountApi.get(
//   '/user-profile',
//   passportConfig.jwtAuthentication,
//   accountController.getUserProfile,
// );

// // ================== Kiểm tra API có hoạt động không ==================
// accountApi.get('/', (req, res) => {
//   res.json({ message: 'Account API is working!' });
// });

// module.exports = accountApi;
const express = require('express');
const accountApi = express.Router();
const accountController = require('../controllers/account.controller');
const passport = require('passport');
const passportConfig = require('../middlewares/passport.middleware');

// ================== Định nghĩa API ==================

// Đăng ký tài khoản
accountApi.post('/register', accountController.postRegisterAccount);

// Đăng nhập
accountApi.post('/login', accountController.postLogin);
accountApi.post('/logout', accountController.postLogout);

// Đăng nhập bằng Google
// accountApi.post(
//   '/login-gg',
//   passport.authenticate('google-token', { session: false }),
//   accountController.postLoginSocialNetwork
// );
accountApi.post(
  '/login-gg',
  passport.authenticate('google-token', { session: false }),  // Đây là nơi xác thực diễn ra
  (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
  },
  accountController.postLoginSocialNetwork  // Tiếp tục nếu xác thực thành công
);
// Đăng nhập bằng Facebook
accountApi.post(
  '/login-fb',
  passport.authenticate('facebook-token', { session: false }),
  accountController.postLoginSocialNetwork
);

// Quên mật khẩu & đặt lại mật khẩu
accountApi.post('/reset-password', accountController.postResetPassword);

// Cập nhật thông tin người dùng
accountApi.put('/toggle-favorite', accountController.putToggleFavorite);
accountApi.put(
  '/update-coin',
  passportConfig.jwtAuthentication,
  accountController.putUpdateUserCoin
);
accountApi.put(
  '/update-avt',
  passportConfig.jwtAuthentication,
  accountController.putUpdateAvt
);
accountApi.put(
  '/update-profile',
  passportConfig.jwtAuthentication,
  accountController.putUpdateProfile
);

// Lấy thông tin người dùng
accountApi.get(
  '/user-info',
  passportConfig.jwtAuthentication,
  accountController.getUserInfo
);
accountApi.get('/send-verify-code', accountController.getVerifyCode);
accountApi.get(
  '/user-profile',
  passportConfig.jwtAuthentication,
  accountController.getUserProfile
);

// ================== Kiểm tra API có hoạt động không ==================
accountApi.get('/', (req, res) => {
  res.json({ message: 'Account API is working!' });
});

module.exports = accountApi;
