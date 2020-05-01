/**
 * post controller that handles all the posts in the forum
 */
const posts = require('../models/posts');

/**
 * add a new post into the database
 * @param {*} title 
 * @param {*} content 
 */
function post(title, content){
    posts.push({
        id: posts.length+1,
        href: "/post/"+(posts.length+1),
        title: title,
        content: content
    });
}
/**
 * get all existing titles of the posts in the database
 * @param {*} titles an empty array to be added 
 */
function getTitles(titles){
    for (post of posts){
        titles.push(post["title"]);
    }
}

/**
 * get existing hrefs of posts in the database
 * @param {} hrefs an empty array to be added
 */
function getHrefs(hrefs){
    for (post of posts){
        hrefs.push(post["href"]);
    }
}

/**
 * get the title and content given a relative href
 * @param {*} href 
 * return a list of [title, content]
 */
function getTitleAndContentAndComments(href){
    for (post of posts){
        if (href === post['href']){
            title = post['title'];
            content = post['content'];
            comments = post['comments']
            return [title,content, comments];
        }
    }
}

/**
 * get all post in the database
 * @return an array of posts
 */
function getAllPosts(){
    return posts;
}


/**
 * get posts associated by certain tags
 * @param {*} tag 
 * @param {*} res an empty array to be put
 */
function getPostsByTag(tag, res){
    for (post of posts) {
        if (post['tags'].includes(tag)){
            res.push(post);
        }
    }
    return res;
}

/**
 * add comments to a post
 * @param {} href 
 * @return post
 */
function addComment(href, comment){
    for (post of posts) {
        if (post['href'] == href) {
           post['comments'].push(comment);
           return post; 
        }
    }
}
module.exports = {getHrefs, getTitles, post, getTitleAndContentAndComments, getAllPosts,
                  getPostsByTag, addComment};