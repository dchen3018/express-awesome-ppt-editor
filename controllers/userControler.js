var User = require('../models/users');

exports.user_create_post = function (req, res, next) {
  let user = new User({
    username: req.body.username,
    password: req.body.password
  })

  user.save(function(err){
    if(err){return next(err)}
    //Successful
    res.status(200).json({user: req.body.username, password: req.body.password})
  })

}
