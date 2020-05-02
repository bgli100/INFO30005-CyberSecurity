/**
 * controller that handles user login
 */
var users = require("../models/userInfo");

/**
 * check if a pair of user name and password is valid
 * @param {*} userName 
 * @param {*} pwd 
 * @return true if user name exactly matches password
 */
function checkUser(userName, pwd){
    return users.checkUser(userName, pwd);
}

/**
 * get all user names registered in this website
 * @param {} userNames an empty list to be added
 */
function getUsers(userNames){
    users.getUsers(userNames);
}
module.exports = {checkUser, getUsers};