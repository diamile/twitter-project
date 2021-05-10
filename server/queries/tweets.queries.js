const Tweet = require('../models/tweet.model');
const colors = require('colors');


exports.getTweets = async (req,res)=>{
  //console.log(colors.yellow("headers"),req.headers['authorization']);
  console.log(colors.yellow('reqs'),req);
  console.log(colors.yellow('users'),req.user._id)
  const tweets = Tweet.find({ author: { $in: [ req.user._id.toString() ] }}).populate('author').exec();
  console.log(colors.yellow('tweets'),tweets);
  return await Tweet.find({ author: { $in: [ req.user._id.toString() ] }}).populate('author').exec();
};


exports.getTweet = async (req,res)=>{
  //console.log(colors.yellow("headers"),req.headers['authorization']);
  return await Tweet.find({});
};

exports.deletedTweet = (req,res)=>{
  console.log('req',req)
  return Tweet.findOneAndDelete({_id:req.params.id});
}

exports.postTweet = (req,res)=>{
  //console.log("req",req.user._id);
  let data = req.body;
  const newTweet = new Tweet({...data,author:req.user._id.toString()});
  return newTweet.save()
}

exports.updateTweet = (req,res)=>{
 const {id,content}=req.body;
  return  Tweet.findOneAndUpdate({_id:id},{$set:{content:content}});
}