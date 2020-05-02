/**
 * post controller that handles all the posts in the forum
 */
const posts = require('../models/posts');

/**
 * insert the post
 * @param {*} title 
 * @param {*} content 
 */
function post(title, content){

    posts.post(title, content);
}
/**
 * get all Titles of the post
 * @param {*} titles an empty array to be added 
 */
function getTitles(titles){
    posts.getTitles(titles);
}

/**
 * get all hrefs of the post
 * @param {} hrefs an empty array to be added
 */
function getHrefs(hrefs){
    posts.getHrefs(hrefs);
}

/**
 * get title, content and comments of an existing post
 * @param {*} href 
 * return a list of [title, content, comments]
 */
function getTitleAndContentAndComments(href){
    return posts.getTitleAndContentAndComments(href);
}

/**
 * get all post in the database
 * @return an array of posts
 */
function getAllPosts(){
    return posts.getAllPosts();
}


/**
 * get posts associated by certain tags
 * @param {*} tag 
 * @param {*} res an empty array to be put
 */
function getPostsByTag(tag, res){
    posts.getPostsByTag(tag, res);
    return res;
}

/**
 * add comments to a post
 * @param {} href 
 * @return post
 */
function addComment(href, comment){
    return (posts.addComment(href, comment));
}
module.exports = {getHrefs, getTitles, post, getTitleAndContentAndComments, getAllPosts,
                  getPostsByTag, addComment};