const postModel = require("../../db/models/post");
const commentModel = require("./../../db/models/comment");


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
    .findOneAndUpdate({ _id: id , user: req.token.id, isDel: false }, 
        {isDel: true}, 
        {new:true}).exec()
    .then((result) => {
        if(result) {
          res.status(200).json("deleted")
          commentModel
          .updateMany({user: id}, { $set: { isDel: true}})
          .catch((err) => {
            res.status(400).send(err)
        }) 
      } else {
           res.status(404).json("its already delete");
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


  const adminDeletePost = (req, res) => {
    const { id } = req.body;
    postModel
    .findOneAndUpdate({ _id: id , isDel: false }, 
      {isDel: true}, 
      {new:true}).exec()
      .then((result) => {
        if (result) {
          res.status(200).json("deleted")
          commentModel
          .updateMany({user: id}, { $set: { isDel: true}})
          .catch((err) => {
            res.status(400).send(err)
        }) 
        }
        else {
          res.status(404).json("its already delete");
       }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }




module.exports = {addPost, getAllPost, getPost, deletePost,updatePost, adminDeletePost};