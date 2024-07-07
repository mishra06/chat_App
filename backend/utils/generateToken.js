const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const tokenVeryfy = (userId,res)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        exp: new Date().getTime() + 3600 * 1000,
    });

    res.cookie("jwt",token,{
        // maxAge: 10 * 24 * 60 * 60 * 1000,
        // httpOnly: true,
        // sameSite:"strict",
        maxAge: 20 * 24 * 60 * 60 * 1000,  //ms
        sameSite: 'none',
        secure: true,
        path: '/',
    })
    
};

module.exports=tokenVeryfy;