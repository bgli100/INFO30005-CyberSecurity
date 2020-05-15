const mongoose = require('mongoose');
const Rating = mongoose.model('ratings');
const ObjectId = mongoose.mongo.ObjectId;
const param = require('../../models/param');

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
        }], (_err, doc) => {
            res.json({
                _id: id,
                total: doc.total ? doc.total : 0
            });
        });
    };
};

const giveRating = (type) => {
    return (req, res) => {
        const id = req.params.id;
        if(!param.validateBody(req, res, ['rating']) ||
           !param.validateId(res, id)) {
            return;
        }
        Rating.updateOne({ // if exist, update one
            target: ObjectId(id),
            type: type,
            user: ObjectId(req.body.user)
        }, {
            target: ObjectId(id),
            type: type,
            user: ObjectId(req.body.user),
            rating: req.body.rating
        }, {
            upsert: true // if not exist, insert one
        }, (_err, doc) => {
            res.json(doc);
        });
    };
};

module.exports = {getRating, giveRating};