var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//get test page for quill delta function
router.get('/test', function(req, res, next) {
  res.render('quill-playground', {title: 'Test Page with Quill'})
})

module.exports = router;
