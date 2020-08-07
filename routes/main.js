var express = require('express');
var session = require('express-session');
var router = express.Router();

var user_controller = require('../controllers/userControler');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landingPage', { title: 'An Awesome Eidtor' });
});


router.get('/main-folder', function(req, res) {

    res.render('mainFolder', {title: 'Main Folder Page', user: req.session.key});

});

router.post('/login', function(req,res,next){
  // req.session.user = req.body.username
  // req.ression.password = req.body.password

  res.send('ok')
})

//some test pages
router.get('/drag-and-drop-test', function(req, res) {
  res.render('drag-and-drop-test')
})

router.get('/local_file', function(req, res) {
  res.render('local_file')
})

router.post('/upload', function(req,res) {
  console.log(req.fields)
})

router.get('/album', function(req, res) {
  res.render('album')
})


module.exports = router;
