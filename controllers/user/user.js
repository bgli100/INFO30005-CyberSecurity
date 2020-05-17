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
    res.render('user');
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
    // const id = req.params.id;
    // if(!param.validateId(res, id)) {
    //     return;
    // }
    // // verification of user infomation
    // let hasError = getUserIDFromCookie(req, res).then((id_cookie)=>{
    //     if (!id_cookie) {
    //         console.error("Error, you have not logged in");
    //         res.json({
    //             error: "you have not logged in"
    //         });
    //         return true;
    //     } else if (id != id_cookie){
    //         console.error("userInfo unmatched");
    //         res.json({
    //             error: "user information unmatched"
    //         });
    //         return true;
    //     }
    //     return false;
    // });
    // if (hasError) return;
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
    const new_icon = req.body.icon;
    const new_password = req.body.password;
    const new_email = req.body.email;

    if (!param.validateId(res,req.params.id)){
        return;
    }
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

    if (hasError) return;

    const id = req.params.id;
    User.findById(ObjectId(id), (err, doc) =>{
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

module.exports = {indexPage, verifyLogin, signup, getProfile, updateProfile, getPostsByUser,getCommentsByUser, logout, getUserIDFromCookie, getAdminIDFromCookie};