var quill = new Quill('#editor-container', {
  theme: 'bubble'
});
quill.on('text-change', update);
var container = document.querySelector('#delta-container');
update();

function update(delta) {
  var contents = quill.getContents();
  console.log('contents', contents);
  var html = "contents = " + JSON.stringify(contents, null, 2);
  if (delta) {
    console.log('change', delta)
    html = "change = " + JSON.stringify(delta, null, 2) + "\n\n" + html;
  }
  container.innerHTML = html;
  //hljs.highlightBlock(container);
}
