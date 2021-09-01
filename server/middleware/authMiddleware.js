const jwt = require('jsonwebtoken')

module.exports = function (req,res,next){
   if(req.method === "OPTIONS"){
       next()
   }
   try {
         let token = req.headers.authorization.split(' ')[1]
       // console.log(req.headers.authorization)
       // console.log(token)
         if (!token){
             res.status(403).json({message:"Не авторизован"})
         }
       const decoded = jwt.verify(token, process.env.SICRET_KEY);
       req.user = decoded
       next()
   }catch (e) {
       res.status(403).json({message:"Не авторизован 22"})
   }
}