const router=require('express').Router();
const User=require('./model/user');
 
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

//handle home submission

router.post('/register', async(req,res)=>{
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
router.post('/login', async (req, res) => {
    try {
      // Find the user with the specified email in the database
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        // If the user is not found, return an error response
        return res.status(400).send({ message: 'Invalid email or password' });
      }
  
      // Compare the provided password with the hashed password stored in the database
      const passwordMatch = await bcrypt.compare(req.body.password, user.password);
      if (!passwordMatch) {
        // If the passwords don't match, return an error response
        return res.status(400).send({ message: 'Invalid email or password' });
      }
  
      // Generate a JWT token containing the user's ID
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  
      // Return a success response with the token
      res.send({ token });
    } catch (err) {
      // Handle any errors
      console.error(err);
      res.status(500).send({ message: 'An error occurred' });

    }
    res.render("main")
  });
  
  module.exports = router;