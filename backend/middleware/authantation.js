const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authantation = async(req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            return next();
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            // return next();
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("error in authantation process",error.message);
        return res.status(401).json({
            success: false,
            message: "Token not provided"
        });
    }
}

module.exports = authantation;