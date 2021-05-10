
//Set up default mongoose connection
const mongoose = require('mongoose');

//var mongoDB = 'mongodb://127.0.0.1/twitter';

var mongoDB = "mongodb+srv://papa2019:Allahou1@cluster0.kr9in.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true,autoIndex: false});

//Get the default connection
var db = mongoose.connection;

//db.dropDatabase("twitter");


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connecting to database');


});