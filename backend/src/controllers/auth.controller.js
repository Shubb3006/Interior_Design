import { generateToken } from "../lib/utils.js";
import Admin from "../models/admin.model.js";
import bcrypt  from 'bcryptjs';

export const signUp=async(req,res)=>{
    try {
      if (process.env.ALLOW_ADMIN_SIGNUP ==="false") {
        return res.status(403).json({ message: "Signup disabled" });
      }
      
        const {email,name,password}=req.body;
        if(!email || email.trim().length==0) 
            return res.status(404).json({message:"Invalid Email"})
        if(!name || name.trim().length==0) 
            return res.status(404).json({message:"Invalid Name"})
        if(!password || password.trim().length<6) 
            return res.status(404).json({message:"Password must be of length 6"})

        const user=await Admin.findOne({email:email.toLowerCase()});
        if(user) return res.status(404).json({message:"User already Exists"})
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const newUser = new Admin({
          name,
          email: email.toLowerCase(),
          password: hashedPassword,
         
        });
        generateToken(newUser._id, res);
        await newUser.save();
        return res.status(200).json(newUser);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal Server Error"})
    }
}

export const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || email.trim().length==0) 
            return res.status(404).json({message:"Invalid Email"})
        if(!password || password.trim().length<6) 
            return res.status(404).json({message:"Password must be of length 6"})

        const user=await Admin.findOne({email:email.toLowerCase()});
        if(!user) return res.status(404).json({message:"User Does Not Exists"})

        const compare=await bcrypt.compare(password,user.password);
        if(!compare) return res.status(404).json({message:"Invalid credentials"});
        
        generateToken(user._id, res);
   
        return res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal Server Error"})
    }
}

export const check = async (req, res) => {
    try {
      return res.status(200).json(req.user);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "internal server error" });
    }
  };
  
  export const logout = async (req, res) => {
    try {
      res.cookie("jwt_token", "", { maxAge: 0 });
      res.status(200).json({ message: "Logged Out Succesfully" });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "internal server error" });
    }
  };
  