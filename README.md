# web-info-tech
Sample user:
`user` with password `user` is a normal user.

`admin` with password `admin` is an admin.
<pre>
Functionalities
1. User management
   Router: user.js (shared by all)
   Model: user/userInfo.js (shared by all)
   Controller: user/user.js (shared by all)
   Views: user.pug layout.pug (shared by all)
   Public: public/static/user (shared by all)
    
   User management has user login, signup, view profile and update profile functionalities.
   1. user login: /user#login
   2. user signup: /user#signup
   3. sample user profile: /user/5edb3644a92e9c157026b2e1/profile
   (user profile can also be visited by clicking on user name in the post)
   (Note that there might be improper display of user profile and update. This is due to the delay of
   the remote server and Chrome code optimisation. Please clear the browser cache and refresh the
   page. Otherwise, you can test it locally.)
   4. user update is in the profile page, it can be updated when user has logged in and go to user's
   own profile page.
2. Forum 

    Router: forum.js (shared by all)
    Views: forum.pug layout.pug (shared by all)
    Public: public/static/forum (shared by all)

    Forum has creating post, commenting on post, deleting post, deleting comment functionality.
    We use troubleshooting forum as an example.
    1. trouble shooting forum: /forum#troubleshooting
    model: forum/post.js controllers: forum/index.js, post.js
    
    2. post page: /forum/post/5edbb24279924900179a19ad/content 
    model: forum/post.js, comment.js controller: forum/comment.js, post.js
    it will render comments if other users have commented on the post.
    
    Below methods needs user log in (if you do not sign in and visit the url, there will either
    be error handling and redirection or the content will not be shown)
    3. Create a new post: /forum#troubleShooting/create or click on New Post button in the forum
    model: forum/post.js controller: forum/post.js
    
    4. Add a comment to a post: write comment in the post section and click on submit
    model: forum/comment.js controller: forum/comment.js
    Below methods needs user of type admin log in
    
    5. delete post: click on delete button next to the post title in the forum page
    model: forum/post.js controller: forum/post.js
    
    6. delete comment: click on delete button next to the comment content in the post page
    model: forum/comment.js controller: forum/comment.js
    
3. Rating system
    Router: forum.js (shared by all)
    controller: forum/rating.js (shared by all)
    model: forum/rating.js (shared by all)
    views: in the React code
    
    Rating system will show the rating of a comment, the rating of user and give "like" to add
    one rating for both the comment and user.
    1. view the rating of a comment: go to post page where there are some comments. Rating is
    shown next to the comment.
    2. view the rating of a user: go to user profile page according to the step 3 in
    user management.
    3. (You must log in) give like to a comment: click on like to a comment. You cannot
    give multiple like to a comment.

4. Front page
    Router: index.js
    controller: none
    model: none
    
    Front page defines the purpose of our website and also navigate to the subforums.
    go to / to the front page.
</pre>

Importing DB
`mongorestore --archive=test.archive`

Testing
<pre>
npm test will run the testing. Please do not change the user's description with the user name "user"
in order to pass all the tests. Uncomment the signup test to run it. Signup test can only run once.
</pre>
Reponsive design: Using moblie phone or other small size device will let naviagtion bar turn into a checklist to select each link. In the forum page, the title of posts will be reponsive so that it will not overlap with other texts.
