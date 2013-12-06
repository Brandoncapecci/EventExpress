$(document).ready(function() {
	
	$(".comment-form").on('submit', function() {
  	$.ajax({
      url: $(this).attr('action'),
      method: $(this).attr('method'),
      data : $(this).serialize(),
      cache: false,
      success:function(resp) {
      	if (resp == "comment created") {
          //add to html
          console.log("comment created");
      	}
      }
  	});
  	return false;
	});

});