var users = require("../models/userInfo");

var login = function(userName, pwd){
    for (user of users){
        if (user['userName'] == userName && user['password'] == pwd) {
            return true;
        }
    }

    return false;
}

module.exports = login;