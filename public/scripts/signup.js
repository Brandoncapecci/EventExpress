$(document).ready(function() {
	
	$(".signup-form").on('submit', function() {
		console.log("javascript");
		$.ajax({
      url: $(this).attr('action'),
      method: $(this).attr('method'),
      data : $(this).serialize(),
      cache: false,
      success:function(resp) {
      	console.log("resp", resp);
      }
		});
		return false;
	});

});