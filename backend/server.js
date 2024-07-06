const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();
const PORT = process.env.PORT;
// const server = express();
const { app , server } =require("./socket/socket");
app.use(express.json());
const authRouter = require("./routes/auth");
const messageRouter = require("./routes/message");
const userRouter = require("./routes/user");

// app.use(cors());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Database connected succesfully"))
.catch((err)=> console.log(`Error in DB connection ${err}`));

const corsOptions = {
    origin:"http://localhost:3000",
    credentials:true
  }
  
app.use(cors(corsOptions));

app.use(cookieParser());

app.use("/api/auth",authRouter);
app.use("/api/message",messageRouter);
app.use("/api/users",userRouter);

server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})