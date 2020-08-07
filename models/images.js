var mongoose = require('mongoose');
var gridStore = require('mongoose-gridstore');

var Schema = mongoose.Schema();

var imageSchema = new Schema({
  name: String,
  type: String,
  data: String
});

imageSchema.plugin(gridStore);

module.exports = mongoose.model('Image', imageSchema);
