const express=require("express");
//Start the express app
const app=express();
//Use ejs-mate
const engine = require('ejs-mate');
app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method")); // Enable support for ?_method=PUT

//require mongoose for accesing mongo DB
const mongoose=require("mongoose");
//mongoose connection
mongoose.connect("mongodb://localhost:27017/Crud").then(()=>{
console.log("DB connected!");
}).catch(()=>{
    console.log("Some error occured!");
});



//import the users database from models
const User=require("./models/users.js")
//to start the app
app.listen(8000,(req,res)=>{
    console.log("App started!");
})
//to display the data (READ) operation
app.get("/",async (req,res)=>{
    const arr=await User.find({});
    // console.log(arr);
    
    res.render("Display.ejs",{arr});
})
//to perform UPDATE operation
app.put("/users/:id",async(req,res)=>{
    console.log("I am working");
    let {id}=req.params;
    const user=await User.findByIdAndUpdate(id,{...req.body});
    console.log(user);

    res.redirect("/");

});
// to render EDIT form
app.get("/users/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const element=await User.findById(id);
    res.render("Edit.ejs",{element});

});
// to DELETE the data
app.delete("/:id",async (req,res)=>{
    let {id}=req.params;
    await User.findByIdAndDelete(id);
    res.redirect("/");

});
//to display the form to ADD user
app.get("/users",async(req,res)=>{
    res.render("AddUser.ejs");
})
// to INSERT the newly added data
app.post("/",async(req,res)=>{
    const newUsr=await User.insertOne({...req.body});
    console.log(newUsr);
    res.redirect("/");
});




