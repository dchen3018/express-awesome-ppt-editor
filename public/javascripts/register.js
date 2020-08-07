$(function(){
  //clear the input region

  $('#register-email').val('');
  $('#register-password').val('');
  $('#register-password-re-enter').val('')
  $('#register-username').val('');

  $('#register-submit-button').on('click', function(){
    let passwd = $('#register-password').val();
    let passwdReEnter = $('#register-password-re-enter').val();
    let username = $('#register-username').val();
    let email = $('#register-email').val();

    if(passwd === passwdReEnter){
      $.ajax({
        type: "POST",
        url: "/register",
        data: {username: username, email: email, password: passwd}
      })
      .done(function(data){

      })
    }else{
      alert('re-enter password mismatch')
    }
  });

  $('#register-close-btn').on('click', function(){
    $(location).attr('href', '/');
  })

  $('.alert').alert()
})
