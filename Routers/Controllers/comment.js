const commentModel = require("./../../db/models/comment");

const addComment = (req, res) => {
    const {comment , post} = req.body
    const newComment = new commentModel({ comment, post, user : req.token.id})
    newComment
    .save()
    .then((result) => {
        res.status(201).json(result);

    })
    .catch((err) => {
        res.status(400).json(err);
})
}

module.exports = { addComment };