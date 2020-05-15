const mongoose = require('mongoose');
const Post = mongoose.model('posts');
const ObjectId = mongoose.mongo.ObjectId;
const commentController = require('./comment');
const param = require('../../models/param');

const findAllPost = (_req, res) => {
    Post.find()
        .lean()
        .then((x) => {
            res.json(x);
            // console.log(x);
        });
};

const createPost = (req, res) => {
    if(!param.validateBody(req, res, ['title', 'content'])) {
        return;
    }
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
    const id = req.params.id;
    if(!param.validateBody(req, res, ['title', 'content']) ||
       !param.validateId(res, id)) {
        return;
    }
    Post.findById(id, (err, doc) => {
        if (err || !doc) {
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
    if(!param.validateId(res, id)) {
        return;
    }
    Post.findById(id, (err, doc) => {
        if (err || !doc) {
            res.json({
                error: 'no post found'
            });
            return;
        }
        doc.remove();
        res.json({
            success: true
        });
    });
};

const getPost = (req, res) => {
    const id = req.params.id;
    if(!param.validateId(res, id)) {
        return;
    }
    Post.findById(id, (err, doc) => {
        if (err || !doc) {
            res.json({
                error: 'no post found'
            });
            return;
        }
        commentController.getComment(id, (comment) => {
            doc = doc.toObject();
            doc.comment = comment ? comment : [];
            res.json(doc);
        });
    });
};

module.exports = {findAllPost, createPost, updatePost, deletePost, getPost};