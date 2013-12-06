$(document).ready(function() {
	
	$(".create-form").on('submit', function() {
  	$.ajax({
      url: $(this).attr('action'),
      method: $(this).attr('method'),
      data : $(this).serialize(),
      cache: false,
      success:function(resp) {
      	if (resp == "post created") {
          //add to html
          console.log("post created");
      	}
      }
  	});
  	return false;
	});

});