import { addHeadline, removeWidget, saveFile, loadFile} from './btnHandlers.js';


//button to add editor
$(function(){
  addHeadline();
  removeWidget();
  saveFile();
  loadFile();
})


//handle the click delegation from lower level editor_component
//<div class="editor-board"/>
//  <div id="widget_id"/>    <-- widget_id = widget-0
//    <div id="editor_id" class="editor"/>  <-- editor_id = editor-0
//      <div class="ql-editor"/>   <-- this is dynamically create with new Quill() command
//since the click event comes from lowest level editor_component
//it needs to check which component issue the click event

$(function(){
  $("div.editor-board").on("click", function(e){

    if(e.target.offsetParent == undefined){ //if click on tooltip button
      return;
    }

    let offset_parent = e.target.offsetParent;
    let editor_id_regex = /^editor-\d+$/;
    let widget_id_regex = /^widget-\d+$/;

    let editor_id, widget_id;
    let id_pattern = /\d+/g;


    if(editor_id_regex.test(offset_parent.id)){
      editor_id = offset_parent.id;
      let _id = editor_id.match(id_pattern);
      widget_id = "widget-" + _id;
    } else if(widget_id_regex.test(offset_parent.id)){
      widget_id = offset_parent.id;
      let _id = widget_id.match(id_pattern);
      editor_id = "editor-" + _id;
    } else {
      editor_id = null;
      widget_id = null;
    }

    if(widget_id != null) {
      let widget_state = $(`div#${widget_id}`).attr("widget-state")

      switch(widget_state) {
        case "drag-and-resize":
          window[`quill-${editor_id}`].enable(true);
          window[`quill-${editor_id}`].focus();

          $(`div#${widget_id}`)
          .draggable({disabled: true})
          .resizable({disabled: true})
          .attr("widget-state", "edit-mode")
          .css("border","1px solid red");

          $(`div#${widget_id}>.resizers`).css("display","none");


          //de-focus other selected
          $(`div.widget[id!=${widget_id}]`).each(function(i,e){
            let other_widget_id = e.id;
            let id_pattern = /\d+/g;
            let _id = other_widget_id.match(id_pattern);
            let other_editor_id = "editor-" + _id;
            $(e)
            .draggable({disabled: true})
            .resizable({disabled: true})
            .attr("widget-state", "de-focus")
            .css("border","1px hidden red");

            $(`div#${other_widget_id}>.resizers`).css("display","none");

            window[`quill-${other_editor_id}`].disable();
            // window[`quill_${other_editor_id}`].blur();
          })

          console.log('enter edit-mode')
          break;

        case "de-focus":
          $(`div#${widget_id}`)
            .draggable({containment:"parent",disabled: false})
            .resizable({disabled: false, handles: "e,w"})
            .attr("widget-state", "drag-and-resize")
            .css("border-style","hidden");

          //disable other selected editor mode
          $(`div.widget[id!=${widget_id}]`).each(function(i,e){
            let other_widget_id = e.id;
            let id_pattern = /\d+/g;
            let _id = other_widget_id.match(id_pattern);
            let other_editor_id = "editor-" + _id;

            if($(e).attr("widget-state") === "edit-mode"){
              $(e)
              .draggable({disabled: true})
              .resizable({disabled: true})
              .attr("widget-state", "de-focus")
              .css("border","1px hidden red");

              $(`div#${other_widget_id}>.resizers`).css("display","none");
              window[`quill-${other_editor_id}`].disable();
              window[`quill-${other_editor_id}`].blur();
            }


          })

          $(`div#${widget_id}>.resizers`).css("display","block");

            window[`quill-${editor_id}`].enable(false);
            //window[`quill_${editor_id}`].blur();
          console.log('enter drag-and-resize')
          break;

        case "edit-mode":
          console.log('stay in edit-mode mode')
          break;
      }


    } else {
      //click in the open area, disable all
      $("div.widget").each(function(i,e){
        let widget_id = e.id;
        let id_pattern = /\d+/g;
        let _id = widget_id.match(id_pattern);
        let editor_id = "editor-" + _id;
        $(e)
        .draggable({disabled: true})
        .resizable({disabled: true})
        .attr("widget-state", "de-focus")
        .css("border","1px hidden red");

        $(`div#${widget_id}>.resizers`).css("display","none");

        window[`quill-${editor_id}`].disable();
        // window[`quill_${other_editor_id}`].blur();
      })
    }

    e.stopPropagation();
  })
})
