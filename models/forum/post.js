const mongoose = require('mongoose');
Schema = mongoose.Schema;

let postSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, default: ''},
    user: {type: Schema.Types.ObjectId, required: true},
    time: {type: Date, default: Date.now},
    lastEdit: {type: Date, default: null},
    tag: {type: String, required: true}
}, {collection: 'Posts'});

mongoose.model('posts', postSchema);