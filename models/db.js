const mongoose = require('mongoose');
const uri = "mongodb://root:XeF4VOnGJqYHbwxG@cluster0-shard-00-00-z6l4x.gcp.mongodb.net:27017,cluster0-shard-00-01-z6l4x.gcp.mongodb.net:27017,cluster0-shard-00-02-z6l4x.gcp.mongodb.net:27017/test?authSource=admin&compressors=zlib&gssapiServiceName=mongodb&replicaSet=Cluster0-shard-0&ssl=true";

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

require('./user/userInfo');