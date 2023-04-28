const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const bcrypt = require('bcrypt');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const router=require('./auth');
let port=process.env.PORT||3000;
const cors=require('cors');
 
 //middleware

app.use(bodyParser.json());
app.use(cors());
app.use(router)
dotenv.config();
//connect to database
mongoose.connect(process.env.DB_CONNECT,
    {useNewUrlParser:true,useUnifiedTopology:true}
).then(()=>{
    console.log('connected to db');
}
).catch((err)=>{
    console.log('error connecting to db');
}
)
//routes
app.get('/',(req,res)=>{
    res.json({message:'welcome here'});
}
);
app.post('/register', async(req,res)=>{
    let results=await req.body.fname;
    let results1=await req.body.lname;
    let results2=await req.body.email;

    res.status(201).send({
        message:`user created successfully`,
        fname:results,
        lname:results1,
        email:results2

    });

   
});

/* 

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
//start server*/

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})




