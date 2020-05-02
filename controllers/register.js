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
    users.register(userName, password);
};

module.exports = register;