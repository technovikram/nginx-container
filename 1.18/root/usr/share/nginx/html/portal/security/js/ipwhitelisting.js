(function($){
jQuery.noConflict();
jQuery(document).ready(function() {

  var hdn_delete = $('input[type=hidden][name=delete]').val();
  

   if ($('input[type=radio][name=radioButton]:checked').val() === 'individual') {
    $('#toIPAddressContent').hide();
	
   } else if ($('input[type=radio][name=radioButton]:checked').val() === 'range') {
    $('#toIPAddressContent').show();
   }

  
  $('input[type=radio][name=radioButton]').change(function() {
   if (this.value == 'individual') {
    $('#toIPAddressContent').hide();
	$('[id^="toIP"]').val("");
	 $('[id^="fromIP"]').val("");
   } else if (this.value == 'range') {
	   $('[id^="toIP"]').val("");
		$('[id^="fromIP"]').val("");
    $('#toIPAddressContent').show();
   }
  });

  $('#IpWhitelist_results_tblResults').find('tbody tr td:last-child').filter(function() {

   var text = $(this).text();
   if ($('input[type=hidden][name=delete]').val() === "true") {

    $(this).html('<a class="active" style="cursor: pointer; pointer-events: all; opacity: 1; color: #3366CC; ">Delete</a>');

   } else {
    $(this).html(text);
   }


  });





  if (hdn_delete === "true") {
   $('.active').click(function(e) {
    e.preventDefault();

    var whichtr = $(this).closest("tr");
    if (confirm('Are you sure you want to delete the record?')) {

     //alert($(this).parent().siblings(":eq(1)").text());
     $('#ipwhitelisting_hdnIpData').val($(this).parent().siblings(":eq(1)").text());
     $('form[name=ipwhitelisting]').attr('action', '/apps/Security/deleteIPWhitelistingDetails.action');
     $('form[name=ipwhitelisting]').submit();


    } else {
     // Do nothing!
    }

   });
  }
  
   

  $('#updateIpWhitelistingBtn').click( function() {
	 
    $('#selectedRestrictedUsers option').attr('selected', 'selected');
	$('#selectedUnRestrictedUsers option').attr('selected', 'selected');
});


                    $("#addIpWhitelistingBtn").click(function () {




                        var fromip = $('#fromIP1').val() + '.' + $('#fromIP2').val() + '.' + $('#fromIP3').val() + '.' + $('#fromIP4').val();

                        
                        
                        var a = [];
                        a.push($("#fromIP1").val());
                        a.push(".");
                        a.push($("#fromIP2").val());
                        a.push(".");
                        a.push($("#fromIP3").val());
                        a.push(".");
                        a.push($("#fromIP4").val())
                        if ($('#ipwhitelisting_radioButtonrange').is(':checked')) {
                              a.push("-");
                              a.push($("#toIP1").val());
                              a.push(".");
                              a.push($("#toIP2").val());
                              a.push(".");
                              a.push($("#toIP3").val());
                              a.push(".");
                              a.push($("#toIP4").val())

                             
                              var ip = $('#toIP1').val() + '.' + $('#toIP2').val() + '.' + $('#toIP3').val() + '.' + $('#toIP4').val();

                              
                        }
						
                       
                        $('#ipwhitelisting_hdnIpData').val(a.join(""));
						

                  });
}); 
 
 })(jQuery);
 
 
	  
	   
 