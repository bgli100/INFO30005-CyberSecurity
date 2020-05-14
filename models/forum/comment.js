const mongoose = require('mongoose');
Schema = mongoose.Schema;

let commentSchema = new Schema({
    content: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, required: true},
    time: {type: Date, default: Date.now},
    lastEdit: {type: Date, default: null},
    post: {type: Schema.Types.ObjectId, required: true}
}, {collection: 'Comments'});

mongoose.model('comments', commentSchema);