const mongoose = require('mongoose');
const User = mongoose.model('users');
const ObjectId = mongoose.mongo.ObjectId;
const Comment = mongoose.model('comments');
const Post = mongoose.model('posts');
const crypto = require('crypto');
const SALT = "DADA";

/**
 * authenticate a user log in
 * @param {} req 
 * @param {*} res 
 */
const verifyLogin = (req, res) => {
    let password = crypto.createHash("md5").update(req.body.password + SALT).digest('hex');
    User.findOne({userName: req.body.userName, password: password}, (err, doc) =>{
        if (err) {
            console.error("Error, no such user name registered");
        }
        doc = doc.toObject();
        res.cookie('_userID', doc.ObjectId, {
            expires: new Date(Date.now() + 3600000)
          }).json(doc);
    });
};

/**
 * clear the cookie on log out
 * @param {} req 
 * @param {*} res 
 */
const logout = (req, res) => {
    res.clearCookie('_userID',{
        expires: new Date(Date.now() + 3600000)
      });
};

/**
 * sign up a new user
 * @param {*} req 
 * @param {*} res 
 */
const signup = (req, res) => {
    const newUser = {
        userName: req.body.userName,
        password: crypto.createHash("md5").update(req.body.password + SALT).digest('hex'),
        email: req.body.email,
    };
    const data = new User(newUser);
    data.save((err, doc) => {
        if (err || !doc){
            console.error("Error, used user name");
            res.json({
                error: 'used user name'
            });
            return;
        }
        doc = doc.object();
        res.cookie('_userID', doc.ObjectId, {
            expires: new Date(Date.now() + 3600000)
          }).json(doc);
    });
};

/**
 * get a profile of a user
 * @param {*} req 
 * @param {*} res 
 */
const getProfile = (req, res) => {
    const id = req.params.id;
    User.findById(id, (err, doc) => {
        if (err || !doc) {
            console.error('error, no user found');
            res.json({
                error: 'no user found'
            });
            return;
        }
        doc = doc.toObject();
        res.json(doc);
    });
};

/**
 * let user updates his/her own profile
 * @param {} req 
 * @param {*} res 
 */
const updateProfile = (req, res) => {
    const id = getUserIDFromCookie(req);
    const new_icon = req.body.icon;
    const new_password = req.body.password;
    const new_email = req.body.email;

    User.findByIdAndUpdate(ObjectId(id), (err, doc) =>{
        if (err || !doc) {
            console.error('error, authentication error');
            res.json({
                error: 'authentication error'
            });
            return;
        }
        if (new_icon){
            doc.icon = new_icon;
        }
        if (new_password){
            doc.password = crypto.createHash("md5").update(new_password + SALT).digest('hex');
        }
        if (new_email){
            doc.email = new_email;
        }
    });
};

/**
 * get the posts and comments of a user
 * @param {*} req 
 * @param {*} res 
 */
const getActivities = (req, res) => {
    const id = req.params.id;
    User.findById(id, (err, doc) => {
        if (err || !doc) {
            console.error('error, no user found');
            res.json({
                error: 'no user found'
            });
            return;
        }
        let posts = Post.find({user: ObjectId(id)}).lean();
        let comments = Comment.find({user: ObjectId(id)}).lean();
        let obj = {"posts": posts, "comments": comments};
        res.json(obj);
    });
};


const getUserIDFromCookie = (req) => {
    return req.cookies._userID;
}
module.exports = {verifyLogin, signup, getProfile, updateProfile, getActivities, logout, getUserIDFromCookie};