import projectmodel from "../models/projectmondel.js";
import  jwt  from "jsonwebtoken";
import usermodel from "../models/user.model.js";

async function authProjectMiddleware(req,res,next){
    const token = req.cookies.token;
    if(!token){
       return res.status(401).json({message:"please loing first"})
    }
    try {
     const decoded =   jwt.verify(token , process.env.JWT_SECRET)
     const user = await usermodel.findById(decoded.id)

     req.user = user
     next();

    } catch (error) {
        return res.status(401).json({message:"Invalid Token"})
    }
}
export default {
    authProjectMiddleware
}