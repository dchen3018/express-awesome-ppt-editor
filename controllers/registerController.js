var User = require('../models/users');
var async = require('async')


exports.register_page = function(req,res,next) {
  res.render('register');
}

exports.create_user_account = async function(req, res, next) {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  //check if email address is unqiue
  const count = await User.where({email: email}).count();

  if(count){
    res.json({result: 'failed', text: 'email address already exist'});
  } else {
    let user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    user.save(function(err){
      if(err){
        return next(err)
      }
      res.json({result: 'ok', text: 'create user account successfuly'})

    })
  }
}
