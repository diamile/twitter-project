const {postUser} = require('../queries/user.queries');

exports.postUserQueries = (req,res,next)=>{
  postUser(req,res).then(()=>{
   console.log('User is succesFully saved');
   res.status(200).json(true)
  }).catch((err)=>{
      //console.log('errss',err.errors.nom.message)
      //res.status(300).json(true)
      next(err)
  })
}