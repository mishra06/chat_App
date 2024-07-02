const errorHandler = require("../middleware/errorHandler");
const userModel = require("../models/user");

const getuser = async(req,res)=>{
    try {
        
        const loggedInUserId = req.user?._id;

        console.log(loggedInUserId,"logged in user");

        const filteredUsers = await userModel.find({ _id:{ $ne:loggedInUserId }}).select(" -password");
        console.log("filter user " , filteredUsers);

        res.status(200).json({
            success: true,
            message: "Get users successfully",
            data: filteredUsers
        });

    } catch (error) {
        console.log("Error in getting sidebar users:",error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const getUserControllerForSidebar = {
    getUser: errorHandler.catchAsync(getuser)
}

module.exports = getUserControllerForSidebar; 