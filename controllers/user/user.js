const mongoose = require('mongoose');
const User = mongoose.model('users');
const ObjectId = mongoose.mongo.ObjectId;
const commentController = require('..forum/comment');
const postController = require('..forum/post');


const verifyLogin = (req, res) => {
    
}

module.exports = {verifyLogin, signup, getProfile, updateProfile, getActivities};