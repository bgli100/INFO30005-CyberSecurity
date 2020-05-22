const express = require('express');
const router = express.Router();


//routes to the home page
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Team Cyberium' });
});

router.get('/404', function(req, res, next) {
  res.render('404');
});

module.exports = router;
