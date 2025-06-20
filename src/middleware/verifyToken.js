import jwt from 'jsonwebtoken';
import {JWT_SECRET} from "../../index.js";


export const verifyToken=(req,res,next)=>{
    try {
        const token=req.cookies.token
        if(!token){
            return res.status(401).json({message:"Unauthorized Accesss!"});
        }
        const decoded=jwt.verify(token,JWT_SECRET);
        if(!decoded.userID){
            return res.status(401).json({message:"Unauthorized Accesss!"});
        }
        req.userID=decoded.userID;
        req.role=decoded.role;
        next()
    }catch(e){
        return res.status(401).json({message:"Invalid Token!"});
    }
}