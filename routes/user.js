const express = require('express');
const router = express.Router();
const login = require('../controllers/login');
const register = require("../controllers/register");


 // list an array of existing user names
router.get('/', function(req, res, next) {
    let userNames = [];
    // use login controller to get all names
    login.getUsers(userNames);
    res.send(userNames);
});


// handle user login
// needs to be in default or specify the content type as 
// application/x-www-form-urlencoded in the request header
// in the body, enter in x-www-form-urlencoded form,
// userName : value, password : value
router.post('/login', function(req, res, next) {
    userName = req.body.userName;

    // pass to login controller to check the validity of the log in
    if (login.checkUser(userName, req.body.password)){
        res.send("Welcome " + userName);
    }
    else{
        res.send('unsuccessful login!');
    }
});

/** used in later assessment with front end
 // user sign up page
    router.get('/signup', function(req, res, next) {
    res.render('signup', { title: 'User Sign Up' });
});
 */


// register new user into the database
// needs to be in default or specify the content type as 
// application/x-www-form-urlencoded in the request header
// in the body, enter in x-www-form-urlencoded form,
// userName : value, password : value
router.post('/signup', function(req, res, next) {
    // use register controller to register new user into the database
    register(req.body.userName, req.body.password);
    res.send("Welcome new user " + req.body.userName + '!');
});
module.exports = router;