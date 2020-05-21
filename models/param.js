const mongoose = require('mongoose');
const ObjectId = mongoose.mongo.ObjectId;

/**
 * validate against form params
 * @param {Object} req given by Express.js
 * @param {Object} res given by Express.js
 * @param {Array<String>} required list of required params
 * @param {Boolean} silent should this return error message if found invalid params?
 * @return true if all params valid
 */
const validateBody = (req, res, required, silent = false) => {
    flag = true;
    for(const k in required) {
        key = required[k];
        switch(key) {
            case 'content': // post content, comment content, etc.
            case 'description':
                flag = req.body[key];
                if(!flag) msg = "content can not be missing";
                break;
            case 'title': // post title
                flag = req.body[key] && req.body[key].length > 0;
                if(!flag) msg = "title can not be missing/empty";
                break;
            case 'rating': // rating value
                flag = req.body[key] && parseInt(req.body[key], 10) in [-1, 0, 1];
                if(!flag) msg = "rating must be an integer value ranged in [-1, 1]";
                break;
            case 'email': // user email
                const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                flag = req.body[key] && emailRegexp.test(req.body[key]);
                if(!flag) msg = "email address must be valid";
                break;
            default:
                break;
        }
        if(!flag && !silent) {
            res.json({
                error: msg
            });
        }
        if(!flag) break;
    }
    return flag;
}

/**
 * validate against objectId
 * @param {Object} res given by Express.js
 * @param {String} id value to be checked
 * @param {Boolean} silent should this return error message if found invalid?
 * @return true if all params valid
 */
const validateId = (res, id, silent = false) => {
    if(!ObjectId.isValid(id)) {
        if(!silent) {
            res.json({
                error: 'invalid object id!'
            })
        }
        return false;
    }
    return true;
}

module.exports = {validateBody, validateId};