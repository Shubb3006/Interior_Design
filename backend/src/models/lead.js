import mongoose from "mongoose";
const leadSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type:String,
        required:true,
        trim:true
    },
    city:{
        type:String,
       
        trim:true
    },
    message:{
        type:String,
      
        trim:true
    },
    status: {
        type: String,
        enum: ["pending", "contacted", "converted"],
        default: "pending", 
    },


},{timestamps:true})

const Lead=mongoose.model("Lead",leadSchema);
export default Lead