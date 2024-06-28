const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const server = express();
server.use(express.json());

const authRouter = require("./routes/auth");

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Database connected succesfully"))
.catch((err)=> console.log(`Error in DB connection ${err}`));

server.use("/api/auth",authRouter);

server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})