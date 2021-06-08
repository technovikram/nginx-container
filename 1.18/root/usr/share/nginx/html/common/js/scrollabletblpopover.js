$(document).ready(function(){
	
$("[data-toggle=popover]").popover({
      html: true, 
      content:  function () {		 	     
           return $(this).parent().parent().find(".popover-content").text();
	  }
	});

/*Modal scroll issue on IE*/
$('.modal, body').scroll(function(){
    $('[data-toggle=popover]').popover('hide');
});  

});