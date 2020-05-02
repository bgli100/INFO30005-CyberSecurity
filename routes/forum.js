const express = require('express');
const router = express.Router();
const post = require("../controllers/post");
const rating = require("../controllers/rating");

// the forum page
router.get('/', function(req, res, next) {
    //let titles = [];
    //let hrefs = [];
    //post.getHrefs(hrefs);
    //post.getTitles(titles);
    //res.render('forum', { title: 'forum', titles:titles, hrefs:hrefs });

    // return an array of posts stored in the forum
    let posts = post.getAllPosts();
    res.send(posts);
});

/** not used in back end only design
    // display the page to write post
    router.get('/writingpost', function(req, res, next) {
    //res.render('writingpost', { title: 'new post'});
});
*/

// handle posting page
// needs to be in default or specify the content type as 
// application/x-www-form-urlencoded in the request header
// in the body, enter in x-www-form-urlencoded form,
// title : value, content : value
router.post('/posting', function(req, res, next) {
    //let the post controller registers them into the database
    post.post(req.body.title,req.body.content);
    //res.render('message',{title : "successfully post!!"});
    res.send("title: " + req.body.title+ '\n\n' + 'content:\n\n' + req.body.content);
});

// go to each post
router.get('/post/*',function(req, res, next) {

    //let the post controller to get the title and content for the requested URL
    let a = post.getTitleAndContentAndComments(req.path);
    //res.render('post', {title:a[0], content:a[1]});
    res.send("title: " + a[0] + '\n\n' + 'content:\n\n' + a[1] + "\ncomments:\n\n" + a[2]);
});

// get post by certain tags
router.post('/tag', function(req, res, next){
    let posts = [];
    post.getPostsByTag(req.body.tag, posts);
    res.send(posts);
});

// add a comment to a post
router.post('/comment', function(req, res, next){
    p = post.addComment(req.body.path, req.body.comment);
    res.send(p);
});

// give rating to a specific post
router.post('/rating', function(req, res, next) {
    let path = req.body.path;
    let r = req.body.rating;
    let new_rating = rating.updateRating(path, r);

    res.send("The new rating is " + new_rating);
});

// give posts sorted by rating
router.get('/postbyrating', function(req, res, next) {
    let posts = [];
    rating.sortPostByRating(posts);
    res.send(posts);
});


module.exports = router;