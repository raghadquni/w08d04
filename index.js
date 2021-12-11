const express = require("express");
require("dotenv").config();
require("./db");
const cors = require("cors");
const cookieSession = require("cookie-session");
require("./passport");
const passport = require("passport");





const app = express();
app.use(cors({
    origin:"http://localhost:3000",
    Credentials: true
}));
app.use(express.json());
app.use(cookieSession({ name: "session", keys: ["raghad"], maxAge: 24 * 60 * 60 * 100 }))
app.use(passport.initialize());
app.use(passport.session());

// Google + facebook
const authRoute = require("./Routers/auth");
app.use("/auth", authRoute)

// for Role
const roleRouter = require("./Routers/Routes/role");
app.use(roleRouter);

// for User
const userRouter = require("./Routers/Routes/user");
app.use(userRouter);

// for Post
const postRouter = require("./Routers/Routes/post");
app.use(postRouter);

// for Comment
const commentRouter = require("./Routers/Routes/comment");
app.use(commentRouter);

const PORT = process.env.PORT || 5000;
app.listen(process.env.PORT , () => {
    console.log(`Server on ${PORT}`);
})