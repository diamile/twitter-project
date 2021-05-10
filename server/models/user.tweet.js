const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const {encrypt} = require("../utils/crypto")
const userSchemas  = mongoose.Schema({
  name:{
    type:String,
    required:true,
    maxLength:[5,"tweet trop long"]
  },
  email:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
  
  followers: { type: [mongoose.Schema.Types.ObjectId], ref: 'user' }
})

// userSchemas.statics.hashPassword = async(password)=>{
//  try{
//    const salt = bcrypt.getSalt(10);
//    return bcrypt.hash(password,salt)
//  }catch(err){
//    console.log("err",err);
//  }
// }


// userSchemas.methods.comparePassword = async(password) =>{
//   return bcrypt.compare(password,this.password);

// }


// userSchemas.pre('save', async function (next) {
//   console.log(this, 'Saving the document');
 
//   if (!this.isModified('password')) {
//    next();
//   }
 
//   // const salt = await bcrypt.genSalt(10);
//   // this.password = await bcrypt.hash(this.password, salt);
//   this.password = encrypt(Buffer.from(this.password, 'utf8'));
//   console.log('password',this.password)


//   const data = encrypt(Buffer.from("test", 'utf8'));
//   console.log('data',data)
//  })


//  userSchemas.methods.comparePassword = async function(password) {
//   return bcrypt.compare(password, this.password);
// }

const User = mongoose.model('user',userSchemas);

module.exports = User;