import User from "../models/user.js";
import jwt from "jsonwebtoken";

const register= async(req,res)=>{
    try{
        const{ name, email, password}= req.body;

        const existingUser= await User.findOne({email});

        // if user already exists
        if(existingUser){
            return res.status(400).json({
                message:"User already exists"
            });
        }
        // create new user
        const user= await User.create({name,email,password});

        // jwt token
        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: "7d" }
        );

        return res.status(201).json({
            success: true,
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });
    }
    catch(error){
        console.log(error)
        return res.status(400).json({
            message:"Something went wrong"
        });
    }

};

const login= async(req,res)=>{
    try{
        const{email,password}= req.body;

        const user = await User.findOne({ email });
        
        if (!user){
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect){
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // jwt token
        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: "7d" }
        );

        return res.status(200).json({ 
            success: true, 
            token, 
            user: { id: user._id, name: user.name, email: user.email } 
        });
        
    }
    catch(error){
        return res.status(400).json({
            message:"Something went wrong"
        });
    }
};

export {register,login};