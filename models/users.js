var mongoose = require('mongoose');
var validator = require('validator')

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String, required: true, max: 100 },
  email: {
    type: String,
    required: true,
    unique: true,
    lowcase: true,
    validate: (value) => {
      return validator.isEmail(value)
    }
  },
  password: {type:String, required: true, max: 100}
});


// Export model.
module.exports = mongoose.model('User', UserSchema);
