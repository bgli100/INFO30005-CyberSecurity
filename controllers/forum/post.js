const mongoose = require('mongoose');
const Post = mongoose.model('posts');
const ObjectId = mongoose.mongo.ObjectId;

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
        res.redirect('/forum/' + doc.id);
    });
};

const updatePost = (req, res) => {
    const id = req.params.id;
    Post.findById(id, (err, doc) => {
        if (err || !doc) {
            console.error('error, no post found');
            res.json({
                error: 'no post found'
            });
            return;
        }
        doc.title = req.body.title;
        doc.content = req.body.content;
        doc.save();
    });
    res.redirect('/forum/post/' + id);
};

const deletePost = (req, res) => {
    const id = req.params.id;
    Post.findByIdAndRemove(id).exec();
    res.redirect('/forum/');
};

const getPost = (req, res) => {
    const id = req.params.id;
    Post.findById(id, (err, doc) => {
        if (err || !doc) {
            console.error('error, no post found');
        }
        res.json(doc);
    });
};

module.exports = {findAllPost, createPost, updatePost, deletePost, getPost};