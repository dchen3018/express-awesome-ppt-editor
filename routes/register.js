var express = require('express');
var router = express.Router();

var register_controller = require('../controllers/registerController');

/* register page*/
router.get('/', register_controller.register_page)

//create user account
router.post('/', register_controller.create_user_account)


module.exports = router;
