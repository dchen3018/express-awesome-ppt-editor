$(function(){

  //sign-in button of the landing page
  $('#landing-page-sign-in').on('click', function(){
    //clear login modal inputs after loading the page
    $('#login-modal-input-name').val('')
    $('#login-modal-input-password').val('')
  })

  //close button of the modal
  $('#login-modal-close-btn').on('click', function(){
    $('#login-modal-input-name').val('')
    $('#login-modal-input-password').val('')
  })

  //login button of the modal
  $('#login').on('click', function(){

    let name = $('#login-modal-input-name').val()
    let passwd = $('#login-modal-input-password').val()
    console.log('login server')
    $.post('/login', {username: name, password: passwd})
    .done(function(data) {
      console.log('data: ', data)
    })
  })

})
