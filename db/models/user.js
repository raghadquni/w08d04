const mongoose = require("mongoose");


const user = new mongoose.Schema({
    userNme: { type: String , required: true  },
    email: { type: String , required: true, unique: true },
    password: { type: String, required: true },
    isDel: { type: Boolean, default: false },
    avatar: { type: String, default: "https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg"},
    role: { type: mongoose.Schema.Types.ObjectId , ref: "RoleSchema" },
    resetLink: { date: String, default: ""}
});

module.exports = mongoose.model("User" , user);