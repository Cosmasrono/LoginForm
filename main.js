const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const bcrypt = require('bcrypt');
//configure middleware

app.use(bodyParser.urlencoded({extended:true}));

//handle home submission

app.post('/signup', async(req,res)=>{
    //extract  form data
    const {name,email,password }=req.body;

    //validate form data
    if(!name ||!email ||!password){
        res.status(400).send('please provide all tha information');
        return;
    }
//hash password
const saltRounds=10;
const hashedPassword=await bycrypt.hash(password,saltRounds);

//save user to database

const newUser={ name, email, password:hashedPassword};
//call function to save data
//redirect to another page

res.redirect('/confirmation');



});
//start server

app.listen(8000,()=>{
    console.log('server listerning on port 8000');
})

