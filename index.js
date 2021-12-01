const express = require("express");
require("dotenv").config();
require("./db");


const app = express();
app.use(express.json());


// for Role
const roleRouter = require("./Routers/Routes/role");
app.use(roleRouter);

// for User
const userRouter = require("./Routers/Routes/user");
app.use(userRouter);

// for Post
const postRouter = require("./Routers/Routes/post");
app.use(postRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT , () => {
    console.log(`Server on ${PORT}`);
})