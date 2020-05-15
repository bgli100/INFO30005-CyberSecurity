const mongoose = require('mongoose');
const Comment = mongoose.model('comments');
const ObjectId = mongoose.mongo.ObjectId;
const param = require('../../models/param');
const user = require('../user/user');


/**
 * get comments under a post
 * @param {String} postId id of post
 * @param {*} callback callback that takes fetched value
 */
const getComment = (postId, callback) => {
    return Comment.find({
        post: ObjectId(postId)
    }).lean().then(callback);
};

const createComment = (req, res) => {
    const id = req.params.id;
    const userId = user.getUserIDFromCookie(req, res);
    if(!param.validateBody(req, res, ['content']) ||
       !param.validateId(res, id) ||
       !userId) {
        return;
    }
    const item = {
        content: req.body.content,
        user: ObjectId(userId),
        post: ObjectId(id)
    };

    const data = new Comment(item);
    data.save((_err, doc) => {
        res.json(doc);
    });
};

const updateComment = (req, res) => {
    const id = req.params.id;
    const userId = user.getUserIDFromCookie(req, res);
    if(!param.validateBody(req, res, ['content']) ||
       !param.validateId(res, id) ||
       !userId) {
        return;
    }
    Comment.find({
        id: ObjectId(id),
        user: ObjectId(userId)
    }, (err, doc) => {
        if (err || !doc) {
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
    const id = req.params.id;
    if(!param.validateId(res, id) ||
       !user.getAdminIDFromCookie(req, res)) {
        return;
    }
    Comment.findById(id, (err, doc) => {
        if (err || !doc) {
            res.json({
                error: 'no comment found'
            });
            return;
        }
        doc.remove();
        res.json({
            success: true
        });
    });
};

module.exports = {updateComment, getComment, createComment, deleteComment};