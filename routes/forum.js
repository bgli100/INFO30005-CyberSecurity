const express = require('express');
const router = express.Router();
const post = require("../controllers/post");

router.get('/', function(req, res, next) {
    let titles = [];
    let hrefs = [];
    post.getHrefs(hrefs);
    post.getTitles(titles);
    res.render('forum', { title: 'forum', titles:titles, hrefs:hrefs });
});

// display the page to write post
router.get('/writingpost', function(req, res, next) {
    res.render('writingpost', { title: 'new post'});
});

// handle posting page
router.post('/posting', function(req, res, next) {
    post.post(req.body.title,req.body.content);
    res.render('message',{title : "successfully post!!"});
});

// go to each post
router.get('/post/*',function(req, res, next) {
    a = post.getTitleAndContent(req.path);
    console.log(req.path);
    res.render('post', {title:a[0], content:a[1]});
})
module.exports = router;