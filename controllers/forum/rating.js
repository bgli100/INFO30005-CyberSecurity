const mongoose = require('mongoose');
const Rating = mongoose.model('ratings');
const ObjectId = mongoose.mongo.ObjectId;
const param = require('../../models/param');
const user = require('../user/user');

const getRating = (type) => {
    return (req, res) => {
        const id = req.params.id;
        if(!param.validateId(res, id)) {
            return;
        }
        Rating.aggregate([{
            $match: {  // where `target` = req.params.id and `type` = type
                target: ObjectId(id),
                type: type
            }
        }, {
            $group: { // group by req.params.id
                _id: ObjectId(id),
                total: { // select sum(`rating`)
                    $sum: "$rating"
                }
            }
        }], (err, doc) => {
            if(!err && doc) {
                if(doc.length > 0) {
                    res.json(doc[0]);
                } else {
                    res.json({
                        total: 0
                    });
                }
            } else {
                res.json({
                    error: 'get rating failed'
                });
            }
        });
    };
};

const giveRating = (type) => {
    return async (req, res) => {
        const id = req.params.id;
        const userId = await user.getUserIDFromCookie(req, res);
        if(!param.validateBody(req, res, ['rating']) ||
           !param.validateId(res, id) ||
           !userId) {
            return;
        }
        Rating.updateOne({ // if exist, update one
            target: ObjectId(id),
            type: type,
            user: ObjectId(userId)
        }, {
            target: ObjectId(id),
            type: type,
            user: ObjectId(userId),
            rating: req.body.rating
        }, {
            upsert: true // if not exist, insert one
        }, (err, doc) => {
            if(!err && doc) {
                res.json({
                    updated: doc.upserted ? true : doc.nModified > 0
                });
            } else {
                res.json({
                    error: 'update rating failed'
                });
            }
        });
    };
};

module.exports = {getRating, giveRating};