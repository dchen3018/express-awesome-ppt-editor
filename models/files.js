var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var FileSchema = new Schema({
  widget_id : String,
  position: {
    top: String,
    left: String
  },
  content : Object
});


// Export model.
module.exports = mongoose.model('File', FileSchema);
