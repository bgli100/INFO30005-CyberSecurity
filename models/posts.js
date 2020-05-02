var posts=[{
    id : 1,
    href : "/post/1",
    title : "SYN Flood attacks!",
    tags : ['TCP', 'handshake', 'SYN'],
    content : "Shoot many SYN messages to set up flood of TCP connections to a server!\n The server will crash!!",
    rating : 5,
    comments : ["Mate, what are the ways to build a server that avoids this attack?"]
},
{   id : 2,
    href : "/post/2",
    title : "Do not use Telnet!",
    tags : ['ssh', 'Telnet', 'scp'],
    content : "Telnet will expose everything from you...",
    rating : 5,
    comments : ["Shall we use SSH instead?"]
}];

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
        tags : [],
        rating : 0,
        comments : [],
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
 * get title, content and comments of an existing post
 * @param {*} href 
 * return a list of [title, content, comments]
 */
function getTitleAndContentAndComments(href){
    for (post of posts){
        if (post['href'] == href){
            return [post['title'], post['content'], post['comments']];
        }
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
  


module.exports = {post, getTitles, getHrefs, getAllPosts, getPostsByTag, addComment, updateRating,
                 sortPostByRating, getTitleAndContentAndComments};