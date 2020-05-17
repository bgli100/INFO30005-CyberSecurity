# web-info-tech
Three key functionalities (all URLs are relative with implied protocols and domain names)
1. User management
    1. user page that can get all users, use GET request to go to /user
    2. user login, use POST to go to /user/login and set content type as default or application/x-www-form-urlencoded; specify in the body, as in type of x-www-form-urlencoded, with the key value pair, userName: value, password: value.
    Default username: Shuang, password: 123456
    3. user sign up, use POST to go to /user/signup and specify in the body, as in type of x-www-form-urlencoded, with the key value pair, userName: value, password: value.
2. Forum (back-end only)
    1. Get all posts in forum: use `GET` request to `/forum/all`
    2. Add a post to forum: use `PUT` request to `/forum/post`, with value `title` and `content` as `application/x-www-form-urlencoded`. You must logged in.
    3. Delete a post to forum: use `DELETE` request to `/forum/post/:postId`. You must logged in as an admin.
    4. Update a post to forum: use `PUT` request to `/forum/post/:postId`. You must logged in as post owner.
    5. Get a post and its comments from forum: use `GET` request to `/forum/post/:postId`. You must logged in.
    6. Add a comment to a post: use `PUT` request to `/forum/post/:postId/comment`, with value `content` as `application/x-www-form-urlencoded`. You must logged in.
    7. Delete a post to forum: use `DELETE` request to `/forum/post/:postId/comment/:commentId`. You must logged in as an admin.
    8. Update a post to forum: use `PUT` request to `/forum/post/:postId/comment/:commentId`. You must logged in as comment owner.
3. Rating system
    // TODO
