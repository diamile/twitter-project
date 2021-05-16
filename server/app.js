const express = require('express');
const path = require('path');
const index = require('./routes');
require('./db.js');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('errorhandler');
const coookiParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session)
require('dotenv').config()

console.log(process.env.NODE_ENV)


const app = express();
module.exports = app;
app.set('views',path.join(__dirname,'views'));
app.set('views','ejs');

app.use(cors({ origin: true, credentials: true }));
app.use(coookiParser("trois petit chat"));
// app.use(session(
//     {secret:"cerse1",
//      name:"sessionId",
//      resave:false,
//      saveUninitialized:true,
//      cookie:{
//          httpOnly:true,
//          maxAge:1000*60*60*24*14
//         },store:new MongoStore({mongooseConnection:mongoose.connection,ttl:60*60*14})},

//         ));

app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(index);

//app.use(errorHandler());

app.use(express.static(path.join(__dirname, "../client-build")));
app.get("*", async (req, res,next) => {
    try{
        console.log('suis la');
        res.sendFile(path.join(__dirname, "../client-build/index.html"));
    }catch(err){
        next(err)
    }
    
});

app.use((err,req,res,next)=>{
    const errors = err.errors
    console.log('dans le stack d\'erreur');
    console.log('stack',err);
    res.status(400).json(errors);
})


//const port = process.env.PORT || 3001;

//app.listen(port,()=>{console.log(`server running on ${port} in ${process.env.NODE_ENV}`)});