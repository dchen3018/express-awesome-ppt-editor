$(function(){
  $('#register-password').val('');
  $('#register-password-re-enter').val('')
  $('#register-username').val('')

  $('#register-submit-button').on('click', function(){
    let passwd = $('#register-password').val();
    let passwdReEnter = $('#register-password-re-enter').val();
    let username = $('#register-username').val();

    if(passwd === passwdReEnter){
      $.ajax({
        type: "POST",
        url: '/register',
        data: {username: username, password: passwd},
        statusCode: {
          200: function(responseObject, textStatus, jqXHR){
            console.log('responseObject', responseObject);
            console.log('textStatus', textStatus);
            console.log('jqXHR', jqXHR.statusText)
          },
          404: function(responseObject, textStatus, jqXHR){
            //no content found
          },
          503: function(responseObject, textStatus, jqXHR){
            //service unabaliable
          }

        }
      })
      .done(function(data){
        console.log(data)
      })
      .fail(function(jqXHR, textStatus){
        alert('Something went wrong: ', + textStatus);
      })
      .always(function(jqXHR, texttStatus){
        console.log('jqXHR.statusText: ', jqXHR.statusText)
      })
      // $.post('/register', {username: username, password: passwd})
      // .done(function(data){
      //   console.log(data);
      // })
    }else{
      console.log('mis-match')
    }
  });

  $('#register-close-btn').on('click', function(){
    $(location).attr('href', '/');
  })
})
