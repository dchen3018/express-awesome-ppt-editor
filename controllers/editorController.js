exports.load_open_page = function(req,res,next) {
  res.render('editor');
}

exports.playground = function(req, res, next) {
  res.render('quill-playground');
}

exports.load_file = function(req, res, next){
  const filename = req.params.filename
  res.json({filename: filename})
}

exports.save_file = function(req, res, next) {

}
