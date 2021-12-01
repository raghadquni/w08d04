const mongoose = require("mongoose");

const post = new mongoose.Schema({
  img: { type: String },
  des: { type: String, required: true },
  isDel: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
},
{timestamps: true}
);

module.exports = mongoose.model("Post", post);