import { saveToLocalStorage, loadFromLocalStorage } from "./localStorage.js"

window._num = 0;

var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike']
]


var config = {
  theme: 'bubble',
  placeholder:"TEXT",
  modules: {
    toolbar: toolbarOptions
  }
}


function addHeadline() {
  let xPosition = 50;
  let yPosition = 10;


  $("#btn-add-widget").on('click', function(e){
    xPosition += 1;
    yPosition += 1;
    _num += 1;

    var widget_id = "widget-" + _num;
    var editor_id = "editor-" + _num;
    var newWidget = `<div id="${widget_id}"
    class="widget card ui-widget-content"
    widget-state="de-focus"
    style="top:${yPosition}%; left: ${xPosition}%; position: absolute"
    >
    <div id="${editor_id}" class="editor" position absolute></div>
    <div class="resizers">
      <div class="resizer left"></div>
      <div class="resizer right"></div>
    </div>
    </div>`

    $("div.editor-board").append(newWidget);

    window[`quill-${editor_id}`] = new Quill(`#${editor_id}`, config);
    window[`quill-${editor_id}`].blur();

    e.stopPropagation();
  })

}

function removeWidget(){
  $("#btn-remove-widget").on("click", function(){
    $("div.widget").each(function(i,e){
      let widget_id = e.id;
      let id_pattern = /\d+/g;
      let _id = widget_id.match(id_pattern);
      let editor_id = "editor-" + _id;
      if($(e).attr("widget-state") === "drag-and-resize"){
          window[`quill-${editor_id}`] = null;
          $(e).remove();
      }
    })
  })
}

// function saveFile(){
//   $("#btn-save").on("click", function(){
//     let pageContent = $("div#editor-board").html();
//     let jsonString = JSON.stringify(pageContent)
//     console.log(jsonString)
//     let obj = {fileName : "editor-1", content: jsonString}
//     saveToLocalStorage(obj)
//     // let quillContent = window["quill-editor-1"].getContents();
//     // let quillObj = {fileName: "quill-editor-1", content: JSON.stringify(quillContent)}
//     // saveToLocalStorage(quillObj)
//
//
//   })
// }

function saveFile(){
  $("#btn-save").on("click", function(){
      let arr = [];
      $(".widget").each(function(index){
        let widget_id = $(this).attr("id");
        let widget_class = $(this).attr("class");
        let widget_style = $(this).attr("style");

        //widget_id = "widget-1"
        let id_pattern = /\d+/g;
        let _id = widget_id.match(id_pattern);

        let editor_id = 'quill-editor-' + _id
        let widget_content = window[editor_id].getContents()
        let obj = {
          id : widget_id,
          class: widget_class,
          style: widget_style,
          content: widget_content
        }

        let obj_string = JSON.stringify(obj)

        $.post('/editor/file/testFile', {content: obj_string})


      })


  })
}

function saveInDatabase() {
  $("#btn-save").on("click", function(){
      console.log('save page in database')
    })
}

function loadFile() {
  $("#btn-load").on("click", function(){
    console.log('load file')
    let htmlContent = JSON.parse(loadFromLocalStorage("editor-1"))
    $("div.editor-board").append(htmlContent)
    let quillContent = JSON.parse(loadFromLocalStorage("quill-editor-1"));
    window["quill-editor-1"] = new Quill("#editor-1", config);
    //window["quill-editor-1"].updateContents(quillContent)
  })
}

export {addHeadline, removeWidget, saveFile, loadFile}
