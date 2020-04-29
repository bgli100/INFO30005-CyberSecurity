const express = require('express');
const router = express.Router();
const login = require('../controllers/login');
const register = require("../controllers/register");
// user login page
router.get('/', function(req, res, next) {
    res.render('user', { title: 'User Management' });
});

// handle user login
router.post('/login', function(req, res, next) {
    userName = req.body.username;
    if (login(userName, req.body.password)){
        res.render('message', {title: "successfully log in!"});
    }
    else{
        res.render('unsuccessful_login');
    }
});

// user sign up page
router.get('/signup', function(req, res, next) {
    res.render('signup', { title: 'User Sign Up' });
});

// register new user into the database
router.post('/signup/register', function(req, res, next) {
    register(req.body.username, req.body.password);
    res.render('message', {title: "successfully register!"});
});
module.exports = router;