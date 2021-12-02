const userModel = require("../../db/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET_KEY;
require("dotenv").config();


// register (new User)
const register = async (req, res) => {
  const { email, password, role, userNme } = req.body;
  const salt = Number(process.env.SALT);
  
  const savedEmail = email.toLowerCase();
  const savedPassword = await bcrypt.hash(password, salt);

  const newUser = new userModel({
    email: savedEmail,
    password: savedPassword,
    userNme,
    role,
  });
  newUser
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

// get all users
const getUsers = (req, res) => {
  userModel
    .find({isDel: false})
    .populate("role")
    .then((result) => {
      console.log(result,"all users")
      res.send(result);
    })
    .catch((err) => {
      console.log(err)
      res.send(err);
    });
};

// login
const login = (req, res) => {
  const { email, password , userNme} = req.body;
  console.log(email, password , userNme)
  userModel
  // .find({ email: savedEmail} , { userNme: savedUserNme})
  .findOne({ $or: [{email} , { userNme }] }).populate("role").exec()
  .then(async (result) => {
    console.log(result);
      if (result) {
        if (result.email == email || result.userNme == userNme ) {
          const hashedPass = await bcrypt.compare(password, result.password);
          
          console.log(hashedPass)
          if (hashedPass) {
            const payload = {
              email: result.email,
              userNme: result.userNme,
              role :result.role.role,
            };
            const options = {
              expiresIn: "60m",
            };
            let token = jwt.sign(payload, secret, options);
            res.status(200).json({result,token});
          } else {
            res.status(400).json("Wrong email or password");
          }
        } else {
          res.status(400).json("Wrong email or password");
        }
      } else {
        res.status(404).json("Email not exist");
      }
    })
    .catch((err) => {
      console.log(err)
      res.send(err);
    });
};

const deleteUser = (req, res) => {
  const { id } = req.body
  userModel
  .findByIdAndUpdate( id, {isDel: true})
  .then((result) => {
    if(result) {
      res.status(200).json("User is Deleted");
    } else {
      res.status(400).json("User not found")
    }
  })
  .catch((err) => {
    console.log(err)
    res.send(err);
  });
}


module.exports = { register, getUsers, login , deleteUser};