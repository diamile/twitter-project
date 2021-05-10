var mongoose = require('mongoose');
const schema = mongoose.Schema;

const tweetSchemas = schema({
  content:{type:String,minLength:1,maxLength:[30,"tweet trop long"],required:true},
  author:{type:schema.Types.ObjectId,ref:"user",required:true}
 
})

const Tweet = mongoose.model('tweet',tweetSchemas);

module.exports = Tweet;
