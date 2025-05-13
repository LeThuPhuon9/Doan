const UserModel = require('../models/account.model/user.model');
const jwt = require('jsonwebtoken');
const express = require('express');
const { KEYS, ACCOUNT_TYPES } = require('../constant');
const passport = require('passport');
const GooglePlusTokenStrategy = require('passport-google-token').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');


exports.jwtAuthentication = async (req, res, next) => {
  try {
    res.locals.isAuth = false;
    let token = req.cookies ? req.cookies[KEYS.JWT_TOKEN] : null;

    // Check token in Authorization header if not in cookies
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      }
    }

    if (!token) {
      next();
      return;
    }

    // Verify jwt
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded) {
      const { accountId } = decoded.sub;
      let user = await UserModel.findOne({ accountId }).select(
        '-_id username name avt favoriteList coin'
      );

      if (user) {
        user.accountId = accountId;
        res.locals.isAuth = true;
        req.user = user;
      }
    }
    next();
  } catch (error) {
    console.error('Authentication with JWT ERROR: ', error);
    return res.status(401).json({
      message: 'Unauthorized.',
      error,
    });
  }
};

// Authentication with Google OAuth2
passport.use(
  new GooglePlusTokenStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      passReqToCallback: true
    },
    async function (req, accessToken, refreshToken, profile, done) {
      try {
        // Log the received access token
        console.log("Access Token:", accessToken);
        console.log("Request Body Token:", req.body.access_token);

        // Get user info using the access token
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${accessToken}` }
        });

        const data = await response.json();
        console.log("Google User Information:", {
          Email: data.email,
          Name: data.name,
          GivenName: data.given_name,
          FamilyName: data.family_name,
          Picture: data.picture,
          UserId: data.sub
        });

        // Return user information if valid
        return done(null, {
          type: ACCOUNT_TYPES.GOOGLE,
          email: data.email,
          name: data.name,
          avt: data.picture,
          id: data.sub
        });

      } catch (error) {
        console.error('Google Auth Error:', error);
        return done(error, null);
      }
    }
  )
);
passport.use(
  new FacebookTokenStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      passReqToCallback: true
    },
    async function (req, accessToken, refreshToken, profile, done) {
      try {
        console.log("Facebook Access Token:", accessToken);
        console.log("Request Body Token:", req.body.access_token);

        // Gọi Facebook Graph API để lấy thông tin chi tiết người dùng
        const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${accessToken}`);
        const data = await response.json();

        console.log("Facebook User Information:", {
          Email: data.email,
          Name: data.name,
          Picture: data.picture?.data?.url,
          UserId: data.id
        });

        // Trả về thông tin user giống như bên Google
        return done(null, {
          type: ACCOUNT_TYPES.FACEBOOK,
          email: data.email || null,
          name: data.name,
          avt: data.picture?.data?.url || null,
          id: data.id
        });
        

      } catch (error) {
        console.error('Facebook Auth Error:', error);
        return done(error, null);
      }
    }
  )
);