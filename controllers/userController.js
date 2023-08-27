const asyncHandler = require('express-async-handler');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

//@desc register user
//@routes POST /api/users/register
//@access public 
const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error('All field are mendatory');
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error('User already registered');
    }
    //Hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    //console.log("Hashed password", hashedPassword);
    const newUser = await User.create({
        username,
        email,
        password: hashedPassword
    })

    console.log(`user created ${newUser}`)
    if (newUser) {
        res.status(201).json({ _id: newUser.id, email: newUser.email });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
    //res.json({ message: 'User Registration' })
});

//@desc login user
//@routes POST /api/users/login
//@access public 
const loginUser = asyncHandler(async (req, res) => {
    const {email,password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user=await User.findOne({email});
    //compare password with hashed password
    if(user &&(await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign({
            user:{
                username: user.username,
                email:user.email,
                id: user.id,
             }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"15m"}
            );
            res.status(200).json({accessToken});
            
    }else{
        res.status(400);
        throw new Error('user or password is not valid');
    }
    res.json({ message: 'User login' })
});

//@desc current user info
//@routes Get /api/users/current
//@access private 
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});


module.exports = {
    registerUser,
    loginUser,
    currentUser
};