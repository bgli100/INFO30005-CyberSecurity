const posts = require('../models/posts');

/**
 * update the rating of a post
 * @param {} href 
 * @param {*} rating 
 */
function updateRating(href, rating){
    return posts.updateRating(href, rating);
}

/**
 * sort the post by rating
 * @param {} res 
 */
function sortPostByRating(res){
    posts.sortPostByRating(res);
}

module.exports = {updateRating, sortPostByRating};