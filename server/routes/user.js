const express = require('express');
const colors = require('colors');
const {secret} = require('../config/jwt');
const jsonwebtoken = require('jsonwebtoken');
const moment = require('moment');
const User = require('../models/user.tweet');
const Tweet = require('../models/tweet.model')

exports.currenUser = async (req,res,next)=>{
  console.log(colors.red("userssss"),req.user);
  try{
    if(req.user){
        res.json(req.user)
    }
  }catch(err){
   next(err)
  }
  
}

exports.userTweet = async (req,res,next)=>{
  try{
 
    const data = await Tweet.findOne({_id:req.params.id});
    const user = await User.findOne({_id:req.user._id});

    console.log('userx',user);
    const tweeId = data._id;
    const userTweetId = data.author;
    const userId = req.user._id;
    //req.body.followers = [...req.body.followers,userTweetId]
    user.followers = [...user.followers,userTweetId]

    return User.findOneAndUpdate({_id:userId},{$set:{followers:user.followers}});
  }
  catch(err){
   console.log(err);
  }
}
 


exports.refreshToken = async (req,res,next)=>{
  try{
     //recuperation du token dans le header
     const auth = req.headers['authorization'];
     
     if(auth){
       const jwtToken = auth.split(' ')[1];

       const decodedToken = jsonwebtoken.verify(jwtToken,secret);

    if(moment(decodedToken.exp * 1000) > moment().subtract(7,'d')){
      const user = await User.findById(decodedToken.sub).exec();

      const jwtToken = jsonwebtoken.sign({sub:user._id.toString()},secret,{algorithm:"HS256",expiresIn:"15min"})

      return res.status(200).json({user,jwtToken});
      
    }else{
        return res.status(403).json('token too old');
    }
    }
    //  res.json(true)
  }
  catch(err){
    next(err)
  }
}