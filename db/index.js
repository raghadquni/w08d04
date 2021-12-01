const mongoose = require("mongoose");
require("dotenv").config();
const DB = process.env.DB;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(DB, options).then(() => {
  console.log("DB is ready to use");
}),
  (err) => {
    console.log(err);
  };
