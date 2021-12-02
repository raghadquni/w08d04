const roleModel = require("../../db/models/role");

const authorization = async (req, res, next) => {
  console.log(req.token,"token")
  try {
    // const roleId = req.token.role.split(" ")[0];
    // console.log(roleId,"rold id")
    // const result = await roleModel.findOne({role:roleId})
    if (req.token.role.split(" ")[0] === "admin") {
      next();
    } else {
      res.status(403).json("forbidden");
    }
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
};

module.exports = authorization;