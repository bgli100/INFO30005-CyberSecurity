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
function getTitleAndContent(href){
    for (post of posts){
        if (href === post['href']){
            title = post['title'];
            content = post['content'];
            return [title,content];
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
module.exports = {getHrefs, getTitles, post, getTitleAndContent, getAllPosts};