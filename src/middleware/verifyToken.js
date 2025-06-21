import jwt from 'jsonwebtoken';
import {JWT_SECRET} from "../../index.js";

export const verifyToken=(req,res,next)=>{
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({message:"Unauthorized Access! No token or invalid format."});
        }

        const token = authHeader.split(' ')[1]; // Get the token part after 'Bearer '

        if(!token){
            return res.status(401).json({message:"Unauthorized Access! Token missing."});
        }

        const decoded=jwt.verify(token,JWT_SECRET);

        if(!decoded.userID){
            return res.status(401).json({message:"Unauthorized Access! User ID not found in token."});
        }

        req.userID=decoded.userID;
        req.role=decoded.role;
        next()
    }catch(e){
        console.error("Token verification error:", e); // Log the error for debugging
        return res.status(401).json({message:"Invalid Token!"});
    }
}




// import jwt from 'jsonwebtoken';
// import {JWT_SECRET} from "../../index.js";
//
//
// export const verifyToken=(req,res,next)=>{
//     try {
//         const token=req.cookies.token
//         if(!token){
//             return res.status(401).json({message:"Unauthorized Accesss!"});
//         }
//         const decoded=jwt.verify(token,JWT_SECRET);
//         if(!decoded.userID){
//             return res.status(401).json({message:"Unauthorized Accesss!"});
//         }
//         req.userID=decoded.userID;
//         req.role=decoded.role;
//         next()
//     }catch(e){
//         return res.status(401).json({message:"Invalid Token!"});
//     }
// }
