const mongoose = require('mongoose');
const Post = mongoose.model('posts');
const ObjectId = mongoose.mongo.ObjectId;
const commentController = require('./comment');

const findAllPost = (_req, res) => {
    Post.find()
        .lean()
        .then((x) => {
            res.json(x);
            // console.log(x);
        });
};

const createPost = (req, res) => {
    const item = {
        title: req.body.title,
        content: req.body.content,
        user: ObjectId(req.body.user)
    };

    const data = new Post(item);
    data.save((_err, doc) => {
        res.json(doc);
    });
};

const updatePost = (req, res) => {
    Post.findById(req.params.id, (err, doc) => {
        if (err || !doc) {
            console.error('error, no post found');
            res.json({
                error: 'no post found'
            });
            return;
        }
        doc.lastEdit = Date.now();
        doc.title = req.body.title;
        doc.content = req.body.content;
        doc.save();
        res.json(doc);
    });
};

const deletePost = (req, res) => {
    const id = req.params.id;
    Post.findById(req.params.id, (_err, doc) => {
        doc.remove();
        res.json({
            success: true
        });
    });
};

const getPost = (req, res) => {
    const id = req.params.id;
    Post.findById(id, async (err, doc) => {
        if (err || !doc) {
            console.error('error, no post found');
        }
        commentController.getComment(id, (comment) => {
            doc = doc.toObject();
            doc.comment = comment ? comment : [];
            res.json(doc);
        });
    });
};

module.exports = {findAllPost, createPost, updatePost, deletePost, getPost};