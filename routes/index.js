const express = require('express');
const router = express.Router();


//render the home page
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Team Cyberium' });
});

//render the 404 page
router.get('/404', function(req, res, next) {
  res.render('404');
});

module.exports = router;
