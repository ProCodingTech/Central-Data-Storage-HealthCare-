const express = require ("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
require("dotenv").config();

const userRoutes = require ("./Routes/UserRoutes")
const blogRoutes = require ("./Routes/BlogRoutes")

const testRoutes = require ("./Routes/TestRoutes")

app.use(express.json());
app.use(cors());

app.listen(3000, ()=>{
    console.log("App is Running at port 3000");
})

app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

app.use("/test", testRoutes);

// app.get("/", (req, res)=>{
//     res.status(200).json(message);
// })

mongoose.connect(process.env.MONGO_STRING).then(()=>{
    console.log("DB Connected");
}).catch(err =>{
    console.log(err);
})