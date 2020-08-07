var express = require('express');
var router = express.Router();

var editor_controller = require('../controllers/editorController');

router.get('/', editor_controller.load_open_page)
router.get('/playground', editor_controller.playground)
router.get('/file/:filename', editor_controller.load_file)
router.post('/file/:filename', editor_controller.save_file)



module.exports = router;
