const postModel = require("../../db/models/post");


const addPost = (req, res) => {
    const {img, des} = req.body
    const newPost = new postModel({img, des, user: req.token.id })
    newPost
    .save()
    .then((result) => {
        res.status(201).json(result);

    })
    .catch((err) => {
        res.status(400).json(err);
})
}

const getAllPost = (req, res) => {
    postModel
      .find({ user: req.token.id, isDel: false })
      .then((result) => {
        if (result.length > 0) {
          res.status(200).json(result);
        } else {
          res.status(404).json("dont have Post");
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };


  const getPost = (req, res) => {
    const { id } = req.params;
  
    postModel
      .findOne({user: req.token.id, isDel: false , _id: id})
      .then((result) => {
        if (result) {
          res.status(200).json(result);
        } else {
          res
            .status(404).json("No post found");
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };

// delete Post User
  const deletePost = (req, res) => {
    const { id } = req.body;
    postModel
    .findOneAndUpdate({user: req.token.id, isDel: false ,_id: id }, 
        {isDel: true}, 
        {new:true})
    .then((result) => {
        if(!result) {
            return res.status(400).json("dont have any post");
        } else {
            return res.status(200).json("deleted");
        }
    }) 
    .catch((err) => {
        res.status(400).json(err);
      });
  }

  // update Post
  const updatePost = (req, res) => {
    const { id , img , des } = req.body;
    postModel
    .findOneAndUpdate(
    { _id: id, user: req.token.id, isDel: false } , 
    {img , des}, 
    { new : true})
    .then((result) => {
        if(!result) {
            return res.status(400).json("dont have any post");
        } else {
            return res.status(200).json("Update Done");
        }
    }).catch((err) => {
        res.status(400).json(err);
      });
  }


module.exports = {addPost, getAllPost, getPost, deletePost,updatePost};