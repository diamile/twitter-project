
const Tweet = require('../models/tweet.model');
const Cookie = require('js-cookie');
const {getTweets,postTweet,deletedTweet,updateTweet,getTweet} = require('../queries/tweets.queries');

exports.posTweets = (req,res,next)=>{
  postTweet(req,res).then(()=>{
      res.status(200).json(true)
  }).catch((err)=>{
      // const errors = err.errors;
      // res.status(400).json(errors)
      next(err)
  })
}

exports.deletedTweets = (req,res,next)=>{
  deletedTweet(req,res).then(()=>{
    console.log('tweet is succesfully deleted');
  }).catch((err)=>{
    next(err)
  })
}
exports.getWeets = (req,res,next)=>{
  getTweets(req,res).then((response)=>{
    console.log(req.cookies)
    // res.cookie('name', 'papa', {
    //   domain: 'localhost',
    //   maxAge: 900000,
    //   secure:true
      
    // });
    res.cookie('signedCookie','polo',{signed:true});
    //console.log(req.signedCookies)
    //console.log('req.session',req.session.id)
 
    res.status(200).json(response)
  }).catch((err)=>{
    //res.status(400).json(err)
    next(err);
  })
} 



exports.getWeet = (req,res,next)=>{
  getTweet(req,res).then((response)=>{
   
    if(req.session.views){
      req.session.views +=1;
      
    }else{
      req.session.views = 1
    }
    res.status(200).json(response)
  }).catch((err)=>{
    //res.status(400).json(err)
    next(err);
  })
} 

exports.updateTweets = (req,res,next)=>{
  updateTweet(req,res)
  .then(()=>{console.log('tweet is succesfully updated')})
  .catch((err)=>{next(err)});
}