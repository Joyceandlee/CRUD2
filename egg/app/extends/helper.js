const jwt=require('jsonwebtoken');

module.exports.decode=(token,keys)=>new Promise((resolve,reject)=>{
    jwt.verify(token,keys,(err,data)=>{
        if(err){
            reject(err)
        }else{
            resolve(data)
        }
    })
})