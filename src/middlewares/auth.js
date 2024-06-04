import jwt from 'jsonwebtoken'
import {secretKey} from './config.js'
const verifyToken  = (req ,res ,next)=>{
   const token = req.headers.authorization;
   
   const Token = token.replace('Bearer ', '')
   console.log(Token)
   if(!Token){
       return res.status(401).json({error:'Unauthorized;'})
   }
   try {
       const decoded = jwt.verify(Token, secretKey);
       req.user = decoded; 
       next();
       
   } catch (error) {
       return res.status(401).json({ error: 'Invalid token' }); 
   }
   
}

export default verifyToken
