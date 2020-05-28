
const indexPage = (req,res) => {
    res.render('forum', {route: '/static/forum/js/routes.js'});
}


const postPage = (req, res) => {
    res.render('forum', {route: '/static/forum/js/postRoute.js'});
}
module.exports = {indexPage, postPage};


// const indexPage = (req, res) => {
//     let isLogin = getUserIDFromCookie(req, res, true) != false;
//     res.render('user', { is_login: isLogin, route : 'static/user/js/routes.js'});
// }
