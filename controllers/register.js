var users = require("../models/userInfo");

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