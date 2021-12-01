const mongoose = require("mongoose");


const comment = new mongoose.Schema({
  comment: { type: String, required: true },
  post: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Post" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isDel: { type: Boolean, default: false,}
},
{timestamps: true}
);


module.exports = mongoose.model("Comment", comment);