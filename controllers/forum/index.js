
const indexPage = (req,res) => {
    res.render('forum', {route: 'static/forum/js/routes.js'});
}

module.exports = {indexPage};


// const indexPage = (req, res) => {
//     let isLogin = getUserIDFromCookie(req, res, true) != false;
//     res.render('user', { is_login: isLogin, route : 'static/user/js/routes.js'});
// }
