const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  accountId: {
    type: Schema.Types.ObjectId,
    ref: 'account',
    required: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  avt: {
    type: String,
    default: ''
  },
  favoriteList: {
    type: [String],
    default: []
  },
  coin: {
    type: Number,
    default: 0
  }
});

const UserModel = mongoose.model('user', userSchema, 'users');
module.exports = UserModel;
