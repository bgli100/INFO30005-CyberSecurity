const mongoose = require('mongoose');
Schema = mongoose.Schema;

let userSchema = new Schema({
    userName: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    icon: {type: String},   
}, {collection: 'Users'});

mongoose.model('users', userSchema);