const posts = require('../models/posts');

/**
 * update the rating of a post
 * @param {} href 
 * @param {*} rating 
 */
function updateRating(href, rating){
    for (post of posts){
        if (post['href'] == href){
            post['rating'] += parseInt(rating);
            return post['rating'];
        }
    }
}

/**
 * sort the post by rating
 * @param {} res 
 */
function sortPostByRating(res){
    for (post of posts){
        res.push(post);
    }
    res.sort((a,b)=> (a.rating > b.rating)?-1:1);
    return res;
}

module.exports = {updateRating, sortPostByRating};