$(function(){
  const input = $('input#img-selection');
  input.on('change', selectImageFromLocal);

  function selectImageFromLocal() {
    const fileList = input[0].files;
    if( fileList.lenght === 0){
      alter('no imgae file selected');
    } else {
      //console.log("%d files was selected", fileList.length)
      for(const file of fileList) {
        const imgCard = $('<div class="card mb-4 box-shadow border"></div>');
        const image = $(`<img class="card-img-top" src=${URL.createObjectURL(file)}><img>`);
        const fileName = file.name;
        const imageType = file.type;
        const imageSrc = URL.createObjectURL(file);
        var fd = new FormData();
        fd.append('fname', fileName);
        fd.append('type', imageType);
        fd.append('data', imageSrc);
        $.ajax({
          type: 'POST',
          url: '/upload',
          data: fd,
          processData: false,
          contentType: false
        }).done(function(data){
          console.log(data)
        })
        // imgCard.append(image);
        // $('div#img-list').append(imgCard)
      }
    }
  }
})
