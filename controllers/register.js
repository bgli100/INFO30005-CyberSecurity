/**
 * register controller handles user registration
 */
var users = require("../models/userInfo");

/**
 * register user into the database
 * @param {} userName 
 * @param {*} password 
 */
var register = function(userName, password){
    len = users.length + 1;
    users.push({
        id : len,
        userName : userName,
        password : password
    });
    console.log(users);
};

module.exports = register;