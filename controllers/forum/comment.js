const mongoose = require('mongoose');
const Comment = mongoose.model('comments');
const ObjectId = mongoose.mongo.ObjectId;

const getComment = (postId, callback) => {
    return Comment.find({
        post: ObjectId(postId)
    }).lean().then(callback);
};

const createComment = (req, res) => {
    const item = {
        content: req.body.content,
        user: ObjectId(req.body.user),
        post: ObjectId(req.params.id)
    };

    const data = new Comment(item);
    data.save((_err, doc) => {
        res.json(doc);
    });
};

const updateComment = (req, res) => {
    Comment.findById(req.params.id, (err, doc) => {
        if (err || !doc) {
            console.error('error, no comment found');
            res.json({
                error: 'no comment found'
            });
            return;
        }
        doc.lastEdit = Date.now();
        doc.content = req.body.content;
        doc.save();
        res.json(doc);
    });
};

const deleteComment = (req, res) => {
    Comment.findById(req.params.id, (_err, doc) => {
        doc.remove();
        res.json({
            success: true
        });
    });
};

module.exports = {updateComment, getComment, createComment, deleteComment};