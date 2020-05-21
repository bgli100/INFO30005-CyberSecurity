const mongoose = require('mongoose');
const User = mongoose.model('users');
const ObjectId = mongoose.mongo.ObjectId;
const Comment = mongoose.model('comments');
const Post = mongoose.model('posts');
const crypto = require('crypto');
const SALT = "DADA";
const param = require('../../models/param');

/**
 * server user entry page
 * @param {} req 
 * @param {*} res 
 */
const indexPage = (req, res) => {
    let isLogin = getUserIDFromCookie(req, res, true) != false;
    res.render('user', { is_login: isLogin, route : 'static/user/js/routes.js'});
}

/**
 * user profile page
 * @param {} req 
 * @param {*} res 
 */
const profilePage = (req, res) =>{
    res.render('user', {route:'/static/user/js/profile_route.js'});
}
/**
 * authenticate a user log in
 * @param {} req 
 * @param {*} res 
 */
const verifyLogin = (req, res) => {
    let password = crypto.createHash("md5").update(req.body.password + SALT).digest('hex');
    User.findOne({userName: req.body.account, password: password}, (err, doc) =>{
        if (err || !doc) {
            console.error("Error, unmatched user name or password");
            res.json({
                error: 'unmatched user name or password'
            });
            return;
        }
        doc = doc.toObject();
        res.cookie('_userID', doc._id, {
            expires: new Date(Date.now() + 3600000),
            encode: String
        }).json(doc);
    });
};

/**
 * clear the cookie on log out
 * @param {} req 
 * @param {*} res 
 */
const logout = (req, res) => {
    res.clearCookie('_userID', {Path : '/'})
    .json({
        success: true
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
        doc = doc.toObject();
        res.cookie('_userID',  doc._id, {
            expires: new Date(Date.now() + 3600000),
            encode: String
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
    if(!param.validateId(res, id)) {
        return;
    }
    User.findById(id, (err, doc) => {
        if (err || !doc) {
            console.error('error, no user found');
            res.json({
                error: 'no user found'
            });
            return;
        }
        doc = doc.toObject();
        // privacy
        getUserIDFromCookie(req, res, true).then((id_cookie)=>{
            if (!id_cookie || id != id_cookie){
                doc.email = "";
            }
            doc.password = "";
            res.json(doc);
        });
    });
};

/**
 * let user updates his/her own profile
 * @param {} req 
 * @param {*} res 
 */
const updateProfile = (req, res) => {
    if (!param.validateId(res, req.params.id) ||
        !param.validateBody(req, res, ['email', 'description'])){
        return;
    }
    const new_email = req.body.email;
    const new_description = req.body.description;
    let hasError = getUserIDFromCookie(req, res, true).then((id)=>{
        if(!id) {
            console.error("Error, you have not logged in");
            res.json({
                error: "you have not logged in"
            });
            return true;
        } else if (id != req.params.id) {
            console.error("userInfo unmatched");
            res.json({
                error: "user information unmatched"
            });
            return true;
        }
    });

    if (hasError) {
        res.json({
            error: "not logged in"
        });
        return;
    }

    const id = req.params.id;
    User.findById(ObjectId(id), (err, doc) =>{
        if (err || !doc) {
            console.error('error, authentication error');
            res.json({
                error: 'authentication error'
            });
            return;
        }
        //if (new_password){
        //    doc.password = crypto.createHash("md5").update(new_password + SALT).digest('hex');
        //}
        if (new_email){
            doc.email = new_email;
        }
        if (new_description){
            doc.description = new_description;
        }
        doc.save();
        doc = doc.toObject();
        res.json(doc);
    });
};

/**
 * get the posts by the user
 * @param {*} req 
 * @param {*} res 
 */
const getPostsByUser = (req, res) => {
    const id = req.params.id;
    if(!param.validateId(res, id)) {
        return;
    }
    User.findById(id, (err, doc) => {
        if (err || !doc) {
            console.error('error, no user found');
            res.json({
                error: 'no user found'
            });
            return;
        }
        Post.find({user: ObjectId(id)}, (_err, doc)=>{
            if (!doc) {
                res.json({});
                return;
            }
        }).lean()
          .then((x) =>{
            res.json(x);
        });
    });
};
/**
 * get the comments made by the user
 * @param {} req 
 * @param {*} res 
 */
const getCommentsByUser = (req, res) => {
    const id = req.params.id;
    if(!param.validateId(res, id)) {
        return;
    }
    User.findById(id, (err, doc) => {
        if (err || !doc) {
            console.error('error, no user found');
            res.json({
                error: 'no user found'
            });
            return;
        }
        Comment.find({user: ObjectId(id)}, (_err, doc) =>{
            if (!doc) {
                res.json({});
                return;
            }
        }).lean()
          .then((x) =>{
              res.json(x);
          });
    });
};

const getUserIDFromCookie = async (req, res, silent = false) => {
    const id = req.cookies._userID;
    if(!id || !param.validateId(res, id, silent)) {
        return false;
    }

    const result = await User.findById(id);

    if(result && result._id) {
        return result._id;
    } else {
        res.json({
            error: 'user auth failed'
        });
        return false;
    }
}

const getAdminIDFromCookie = async (req, res) => {
    const id = req.cookies._userID;
    if(!id || !param.validateId(res, id)) {
        return false;
    }

    const result = await User.findOne({
        id: ObjectId(id),
        class: 'admin'
    });

    if(result && result._id) {
        return result._id;
    } else {
        res.json({
            error: 'admin auth failed'
        });
        return false;
    }
}

/**
 * check cookie check if request contains cookie value for user to check if a user has logged in
 * @param {*} req 
 * @param {*} res 
 */
const checkCookie = (req, res) =>{
    getUserIDFromCookie(req, res, silent = true).then((id)=>{
        if (!id) {
            res.json({
                error: 'not logged in'
            });
            return;
        }
        User.findById(id, (err, doc) => {
            if (err || !doc) {
                console.error('error, no user found');
                res.json({
                    error: 'no user found'
                });
                return;
            }
            doc = doc.toObject();
            doc.password = "";
            res.json(doc);
        });
    });
};

module.exports = {indexPage,profilePage, verifyLogin, signup, getProfile, updateProfile, getPostsByUser,getCommentsByUser, logout, getUserIDFromCookie, getAdminIDFromCookie, checkCookie};