const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    Name:String,
    Email:String,
    City:String,
    Dept:String
})
const User=mongoose.model("User",userSchema);
module.exports=User;
