import usermodel from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import  jwt  from "jsonwebtoken";


async function registerUser(req, res) {
    const { name, email, password } = req.body;
    const isUserAlready = await usermodel.findOne({ email })
    if (isUserAlready) {
        return res.status(400).json({ message: "User already exists" })
    }

    const hashPassword = await bcryptjs.hash(password,10);

    const user = await usermodel.create({
        name,
        email,
        password:hashPassword
    })
    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET)

    res.cookie("token", token)
    res.status(201).json({
        message:"user register succesfully",
        user:{
            _id:user._id,
            email:user.email,
            name:user.name,
        }

    })
}

async function loginUser(req,res){
    const {email, password} = req.body;
    const user = await usermodel.findOne({email})
    if(!user){
        res.status(400).json({message:"Invalid Emial or Password"})
    }
    const isPassordvalid = await bcryptjs.compare(password,user.password)
        if(!isPassordvalid){
        res.status(400).json({message:"Invalid Emial or Password"})
    }
    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET)

    res.cookie("token", token)
    res.status(200).json({message:"User Logged in successfully",
        user:{
            _id:user._id,
            email:user.email,
            name:user.name
        }
    })
}

async function logoutUser(req,res){
    res.clearCookie("token");
    res.status(200).json({message:"logout Successfully"})
}
export default {
    registerUser,
    loginUser,
    logoutUser
}