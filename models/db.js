const mongoose = require('mongoose');
const uri = "mongodb+srv://root:XeF4VOnGJqYHbwxG@cluster0-z6l4x.mongodb.net/test?retryWrites=true&w=majority";

config = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
};

mongoose.connect(uri, config, 
    (err) => {
        if(!err)
            console.log("db connected.");
        else
            console.log('db connection failed.', err);
    }
);

require('./forum/post');
require('./forum/comment');
require('./forum/rating');