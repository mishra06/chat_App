const errorHandler = require("../middleware/errorHandler");
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
// const tokenVeryfy = require("../utils/generateToken");
const jwt = require("jsonwebtoken");


const signUp = async(req,res)=>{
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password do not match" });
        }

        const user = await UserModel.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "Username already exit try different" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        // profilePhoto
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        await UserModel.create({
            fullName,
            username,
            password: hashedPassword,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            gender
        });
        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
};

const login = async(req,res)=>{
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        };
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect username or password",
                success: false
            })
        };
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect username or password",
                success: false
            })
        };
        const tokenData = {
            userId: user._id
        };

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' });

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            profilePhoto: user.profilePhoto
        });

    } catch (error) {
        console.log(error);
    }
}

const logout = (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "logged out successfully."
        })
    } catch (error) {
        console.log(error);
    }
}


// const signUp = async(req,res)=>{

//     try {
//         const salt = bcrypt.genSaltSync(10);
//         const hash = bcrypt.hashSync(req.body.password, salt);
//         const {fullName , username , password , confirmPassword , gender} = req.body;
//         console.log(req.body);

//         if (password !== confirmPassword) {
// 			return res.status(400).json({ error: "Passwords don't match" });
// 		}

//         const user = await UserModel.findOne({username});

//         if(user){
//             return res.status(400).json({
//                 success:false,
//                 message:" ohh this username is already taken",
//             })
//         }

//         const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
//         const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

//         const newUser = new UserModel({
//             fullName,
//             username,
//             password: hash,
//             gender,
//             profilePic: gender === "male"? boyProfilePic : girlProfilePic
//         });

//         console.log(newUser);

//         if(newUser){
//             tokenVeryfy(newUser._id,res);
//             await newUser.save();

//             res.status(200 ).json({
//                 success:true,
//                 message:"user created successfully",
//                 data:newUser
//             })
//         }
//         else{
//             res.status(400).json({
//                 success:false,
//                 message:"Error creating newUser",
//             });
//         }

//     } catch (error) {
//         console.log("Error creating");
//         res.json({
//             success: false,
//             message: "Internal Server Error",
//             error: error.message
//         });
//     }

// };

 

// const login = async(req,res)=>{
//     try {
//         const { username , password } = req.body;
//         const user = await UserModel.findOne({ username });
//         const isMatch = await bcrypt.compare(password, user?.password || "");

//         if([username, isMatch].some((field)=> typeof field === "string" && field.trim()==='')){
//             return res.status(400).json({
//                 success: false,
//                 message: "Please fill all fields"
//             });
//         }

//         if(!user || !isMatch){
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid username or password"
//             });
//         }

//         tokenVeryfy(user._id,res);

//         res.status(200).json({
//             success: true,
//             message: "Login Successful",
//             id: user._id,
//             data:user
//         });
//     } catch (error) {
//         console.log("Error in login controller", error.message);
// 		res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// const logout = async(req,res)=>{
//     try {
//         res.cookie("jwt","",{maxAge:0});
//         res.status(200).json({
//             success:true,
//             message:"logout successfully"
//         })
//     } catch (error) {
//         console.log("Error: " + error.message);
//         res.status(500).json({
//             success: false,
//             message: "Error logging out"
//         });
//     }
// };

const authController ={
    SignUp: errorHandler.catchAsync(signUp),
    Login: errorHandler.catchAsync(login),
    Logout: errorHandler.catchAsync(logout),
}

module.exports = authController;