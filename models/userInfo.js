var users = [{
    id: 1,
    userName: 'Shuang',
    password: '123456'
  }];

/**
 * check if a pair of user name and password is valid
 * @param {*} userName 
 * @param {*} pwd 
 * @return true if user name exactly matches password
 */
function checkUser(userName, pwd){
  for (user of users){
      if (user['userName'] == userName && user['password'] == pwd) {
          return true;
      }
  }
  return false;
}

/**
 * get all user names registered in this website
 * @param {} userNames an empty list to be added
 */
function getUsers(userNames){
  for (user of users) {
      userNames.push(user["userName"]);
  }
}
/**
 * register user into the database
 * @param {} userName 
 * @param {*} password 
 */
function register(userName, password){
  len = users.length + 1;
  users.push({
      id : len,
      userName : userName,
      password : password
  });
}


module.exports = {checkUser, getUsers, register};