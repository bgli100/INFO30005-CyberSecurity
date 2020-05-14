const mongoose = require('mongoose');
const Rating = mongoose.model('ratings');
const ObjectId = mongoose.mongo.ObjectId;

const getRating = (type) => {
    return (req, res) => {
        console.log(req.params.id);
        Rating.aggregate([{
            $match: {
                target: ObjectId(req.params.id),
                type: type
            }
        }, {
            $group: {
                _id: ObjectId(req.params.id),
                total: {
                    $sum: "$value"
                }
            }
        }], (_err, doc) => {
            res.json({
                _id: req.params.id,
                total: doc.total ? doc.total : 0
            });
        });
    };
};

const giveRating = (type) => {
    return (req, res) => {
        Rating.updateOne({ // if exist, update one
            target: ObjectId(req.params.id),
            type: type,
            user: ObjectId(req.body.user)
        }, {
            target: ObjectId(req.params.id),
            type: type,
            user: ObjectId(req.body.user),
            value: req.body.value
        }, {
            upsert: true // if not exist, insert one
        }, (_err, doc) => {
            res.json(doc);
        });
    };
};

module.exports = {getRating, giveRating};