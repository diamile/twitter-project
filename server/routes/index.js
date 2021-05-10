const express = require('express');
const path = require('path');

const {posTweets , getWeets,deletedTweets,updateTweets,getWeet} = require('../controllers/tweets.controller')
const {postUserQueries} = require('../controllers/user.controller')
const {userConnect} = require('../queries/auth.queries')
const {currenUser} = require('../routes/user')
const isLoggedIn = require('../middlewares/isLoggedIn')
const test = require('../middlewares/testLogedIn')
const {refreshToken,userTweet} = require('../routes/user')



const router = express.Router();



router.post('/api/tweets', test,posTweets)

router.get('/api/tweets',test,getWeets)

router.get('/api/tweet',getWeet)

router.delete('/api/tweets/:id',deletedTweets)

router.get('/api/userTweet/:id',test,userTweet)

router.put('/api/tweets/update',updateTweets);

router.post('/api/users',postUserQueries);

router.post('/api/auth',userConnect);

router.get('/current/user',isLoggedIn,currenUser)

router.get('/token/refresh-token',refreshToken)

module.exports = router;