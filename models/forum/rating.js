const mongoose = require('mongoose');
Schema = mongoose.Schema;

let ratingSchema = new Schema({
    rating: {type: Number, required: true},
    user: {type: Schema.Types.ObjectId, required: true},
    type: {type: String, enum: ['post', 'comment'], required: true},
    target: {type: Schema.Types.ObjectId, required: true}
}, {collection: 'Ratings'});

mongoose.model('ratings', ratingSchema);