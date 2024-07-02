const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();
const PORT = process.env.PORT;
const server = express();
server.use(express.json());
const authRouter = require("./routes/auth");
const messageRouter = require("./routes/message");
const userRouter = require("./routes/user");

// server.use(cors());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Database connected succesfully"))
.catch((err)=> console.log(`Error in DB connection ${err}`));

const corsOptions = {
    origin:"http://localhost:3000",
    credentials:true
  }
  
server.use(cors(corsOptions));

server.use(cookieParser());

server.use("/api/auth",authRouter);
server.use("/api/message",messageRouter);
server.use("/api/users",userRouter);

server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})