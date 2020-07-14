var express = require('express');
var session = require('express-session');
var router = express.Router();

var user_controller = require('../controllers/userControler');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landingPage', { title: 'Landing Page' });
});

router.get('/register', function(req, res){
  res.render('register')
})

router.get('/main-folder', function(req, res) {

    res.render('mainFolder', {title: 'Main Folder Page', user: req.session.key});

});

router.post('/login', function(req,res,next){
  console.log('user name', req.body.username);
  console.log('password', req.body.password)
  req.session.key = req.body.username
  res.send('ok')
})

router.post('/register', user_controller.user_create_post)

module.exports = router;
