const commentModel = require("./../../db/models/comment");
const postModel = require("./../../db/models/post");

const addComment = (req, res) => {
    const {comment , post} = req.body
    
    postModel
    .findOne({ post, isDel: false })
    .then((result) => {
      if (result) {
      const newComment = new commentModel({ comment, post, user: req.token.id})
    newComment
    .save()
    .then((result) => {
        res.status(201).json(result);

    })
    .catch((err) => {
        res.status(40).json(err);
})
} else {
  res.status(404).json("Post Not Found");
}
})
.catch((err) => {
res.status(400).send(err);
});
};

const getComment = (req, res) => {
  commentModel
    .find({ isDel: false })
    .then((result) => {
      if (result.length > 0) {
        res.status(201).send(result);
      } else {
        res.status(404).send("No posts");
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};



const deleteComment = (req, res) => {
    const {post , comment} = req.params
    console.log(post,comment,"params",req.token);
    commentModel
      .findOneAndUpdate({ post: post, _id: comment ,isDel: false },
         { isDel: true },
         { new: true }).exec()
      .then((result) => {
        console.log(result);
          if(result) {
            res.status(201).send("Deleted");
    } else {
        res.status(404).json("Comment Already Deleted");
      }
    }) 
      .catch((err) => {
        res.status(400).json(err);
      });
  };

const deleteCommentFromAdmin = (req, res) => {
  const {post , comment} = req.params
    console.log(post,comment,"params",req.token);
    commentModel
      .findOneAndUpdate({ post: post, _id: comment ,isDel: false },
         { isDel: true },
         { new: true }).exec()
      .then((result) => {
        console.log(result);
          if(result) {
            res.status(201).send("Deleted");
    } else {
        res.status(404).json("Comment Already Deleted");
      }
    }) 
      .catch((err) => {
        res.status(400).json(err);
      });
  };


  // update Comment
  const updateComment = (req, res) => {
    const {post , commentID} = req.params
    const { comment } = req.body;
    commentModel
    .findOneAndUpdate(
    { _id: commentID, user: req.token.id, isDel: false , post: post } , 
    {comment}, 
    { new : true})
    .then((result) => {
        if(!result) {
            return res.status(400).json("This Comment is deleted");
        } else {
            return res.status(200).json("Update Done");
        }
    }).catch((err) => {
        res.status(400).json(err);
      });
  }


module.exports = { addComment, getComment,deleteComment, deleteCommentFromAdmin, updateComment };