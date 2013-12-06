$(document).ready(function() {
	
	$(".login-form").on('submit', function() {
  	$.ajax({
      url: $(this).attr('action'),
      method: $(this).attr('method'),
      data : $(this).serialize(),
      cache: false,
      success:function(resp) {
      	if (resp == "logged in") {
      		window.location = "/feed";
      	}
      }
  	});
  	return false;
	});

  $(".logout-form").on('submit', function() {
    $.ajax({
      url: $(this).attr('action'),
      method: $(this).attr('method'),
      cache: false,
      success:function(resp) {
        if (resp == "logged out") {
          window.location = "/";
        }
      }
    });
    return false;
  });


});