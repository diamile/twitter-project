const User = require('../models/user.tweet')
const bcrypt = require('bcryptjs');
const {encrypt} = require('../utils/crypto');


exports.postUser = (req,res)=>{
console.log('HERERERERERRE')
req.body.password = JSON.stringify(encrypt(Buffer.from(req.body.password, 'utf8')));
req.body.followers = [];

 const user = new User(req.body);
 return user.save();
}