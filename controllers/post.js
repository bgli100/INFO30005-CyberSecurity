const posts = require('../models/posts');

function post(title, content){
    posts.push({
        id: posts.length+1,
        href: "/post/"+(posts.length+1),
        title: title,
        content: content
    });
}

function getTitles(titles){
    for (post of posts){
        titles.push(post["title"]);
    }
}
function getHrefs(hrefs){
    for (post of posts){
        hrefs.push(post["href"]);
    }
}

function getTitleAndContent(href){
    for (post of posts){
        if (href === post['href']){
            title = post['title'];
            content = post['content'];
            return [title,content];
        }
    }
}
module.exports = {getHrefs, getTitles, post, getTitleAndContent};