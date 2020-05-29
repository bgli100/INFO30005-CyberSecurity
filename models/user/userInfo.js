const mongoose = require('mongoose');
Schema = mongoose.Schema;

let userSchema = new Schema({
    userName: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    icon: {type: String},
    description: {type: String},
    class: {type: String, enum: ['user', 'admin'], default: 'user'}
}, {collection: 'Users'});

mongoose.model('users', userSchema);