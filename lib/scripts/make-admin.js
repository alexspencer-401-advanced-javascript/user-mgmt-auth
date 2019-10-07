require('dotenv').config();
const connect = require('../connect');
require('../models/register-plugins');
const User = require('../models/user');
const mongoose = require('mongoose');

connect(process.env.MONGODB_URI);
const userId = process.argv[2];

console.log('Making user', userId, 'admin');

User.updateById(
  userId,
  {
    $addToSet: {
      roles: 'admin'
    }
  }
)
  .then(console.log)
  .catch(console.log)
  .finally(() => mongoose.connection.close());