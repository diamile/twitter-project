const jwt = require('jsonwebtoken');
const User = require('../models/user.tweet')
const color = require('colors')
const {secret} = require('../config/jwt')
const bcrypt = require('bcryptjs')
const {decrypt} = require("../utils/crypto")


exports.userConnect = async(req,res)=>{
  const {email} = req.body;
  const user =  await User.findOne({email:email},"-__v");
  console.log('user',user);

  if(!user){
      return res.status(500).json('User introuvable');
  }


  const data = decrypt(JSON.parse(user.password));

  if(data !== req.body.password){
    console.log('password doesnt match')
   return res.status(500).json('pass doesnt match')
  }else{
      console.log('password match')

    //creation du token

    const jwtToken = jwt.sign({sub:user._id.toString()},secret,{algorithm:"HS256",expiresIn:"15min"});

    if(jwtToken){
        return res.status(200).json({user,jwtToken})
    }

  }

}


