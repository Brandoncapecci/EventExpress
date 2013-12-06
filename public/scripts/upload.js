$(document).ready(function() {

  // $("input:file").change(function (){
  //     $('#uploadForm').submit();
  // });
 
  $('.photo-form').on('submit', function() { 
    $(this).ajaxSubmit({                                                                                                                 
      error: function(xhr) {
      },
      success: function(resp) {
      }
    });
    return false;
  });

});


/*

        if(response.error) {
            status('Opps, something bad happened');
            return;
        }
 
        var imageUrlOnServer = response.path;
 
  status('Success, file uploaded to:' + imageUrlOnServer);
  $('<img/>').attr('src', imageUrlOnServer).appendTo($('body'));
*/