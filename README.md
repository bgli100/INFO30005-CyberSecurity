# web-info-tech
Three key functionalities (all URLs are relative with implied protocols and domain names)
1. User management
    1. user page that can get all users, use GET request to go to /user
    2. user login, use POST to go to /user/login and set content type as default or application/x-www-form-urlencoded; specify in the body, as in type of x-www-form-urlencoded,
    with the key value pair, userName: value, password: value.
    3. user sign up, use POST to go to /user/signup and specify in the body, as in type of x-www-form-urlencoded, with the key value pair, userName: value, password: value.
2. Forum
    1. forum page that can get all posts, use GET to go to /forum.
    2. post new post, use POST to go to /forum/posting and specify in the body, as in type of x-www-form-urlencoded, with the key value pair, title: value, content: value.
    3. access and read post, use GET to go to /forum/post/* (* here is a regex expression, initially can go to /1 and /2).
    4. get certain posts by a tag. Use Post to go to /forum/tag and specify in the body, as in type of x-www-form-urlencoded, with the key value pair, tag : value.
    5. add a comment to a post. Use Post to go to /forum/comment and specify in the body, as in type of x-www-form-urlencoded, with the key value pair, path : value, comment: value.
    path is the relative path of the post (e.g. '/post/1'), comment is text. 
3. Rating system
    1. update the rating of a post. User Post to go to /forum/rating and specify in the body, as in type of x-www-form-urlencoded, with the key value pair, path: value, rating: value.
    path is the relative path of the post (e.g. '/post/1'), rating is a numeric int ranged from -5 to 5.