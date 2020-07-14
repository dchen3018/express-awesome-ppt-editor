$(function(){
  //clear login modal inputs after loading the page
  $('#login-modal-input-name').val('')
  $('#login-modal-input-password').val('')

  //clear login modal inputs when clicking modal close button
  $('#login-modal-close-btn').on('click', function(){
    $('#login-modal-input-name').val('')
    $('#login-modal-input-password').val('')
  })

  //login modal sign in button
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
