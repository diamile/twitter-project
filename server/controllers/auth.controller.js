const {userConnect} = require("../queries/auth.queries");
const color = require('colors');


exports.submitUserConnect = (req,res,next)=>{
    userConnect(req,res).then(()=>{
        res.status(200).json(true)
    })
    .catch((err)=>{
        console.log('err',err);
        if(err){
            next(err);
        }
    })
}

