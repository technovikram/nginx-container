//jQuery.noConflict(true);
$(document).ready(function () {
	$(".ui-datepicker").css('display', 'block');
	var radioValue = $("input[name='displayUserListOnly']:checked").val();	
			if(radioValue=='1'){
				$(".toggleimg").hide();
			}else{
				$(".toggleimg").show();
			}
	//$(".toggleimg").hide();
	var table = $('#Sec_useraccessrpt_tblResults')
		.on('order.dt', function () {
			$("#Sec_useraccessrpt_tblResults tr").each(function () {
				$(this).find("td:last").hide();
			});
			$('#Sec_useraccessrpt_tblResults').find('tbody tr td:nth-child(2)').filter(function () {
				var text = $(this).text();
				$(this).html('<a class="active" style="cursor: pointer; pointer-events: all; opacity: 1; color: #3366CC; ">' + text + '</a>');

			});
			var radioValue = $("input[name='displayUserListOnly']:checked").val();	
			var timeIntarval = setInterval(function() {
			if(radioValue ==='1'){		
				$(".toggleimg").hide();	
			}else{	
				$(".toggleimg").show();	
			}
			clearInterval(timeIntarval);
			}, 5);
		})
		.on('search.dt', function () {
			$("#Sec_useraccessrpt_tblResults tr").each(function () {
				$(this).find("td:last").hide();
			});
			$('#Sec_useraccessrpt_tblResults').find('tbody tr td:nth-child(2)').filter(function () {
				var text = $(this).text();
				$(this).html('<a class="active" style="cursor: pointer; pointer-events: all; opacity: 1; color: #3366CC; ">' + text + '</a>');
			});
			var radioValue = $("input[name='displayUserListOnly']:checked").val();	
			var timeIntarval = setInterval(function() {
			if(radioValue ==='1'){		
				$(".toggleimg").hide();	
			}else{	
				$(".toggleimg").show();	
			}
			clearInterval(timeIntarval);
			}, 5);
		})
		.on('page.dt', function () {
			
			$("#Sec_useraccessrpt_tblResults tr").each(function () {
				$(this).find("td:last").hide();
			});
			$('#Sec_useraccessrpt_tblResults').find('tbody tr td:nth-child(2)').filter(function () {
				var text = $(this).text();
				$(this).html('<a class="active" style="cursor: pointer; pointer-events: all; opacity: 1; color: #3366CC; ">' + text + '</a>');
			});
			var radioValue = $("input[name='displayUserListOnly']:checked").val();	
			var timeIntarval = setInterval(function() {
			if(radioValue ==='1'){		
				$(".toggleimg").hide();	
			}else{	
				$(".toggleimg").show();	
			}
			clearInterval(timeIntarval);
			}, 5);
		})
		.dataTable({
        "language": {                
            "infoFiltered": ""
        }
    });	
		
	$("#Sec_useraccessrpt_tblResults tbody").on("click", "td.details-control", function () {
		var tr = $(this).closest("tr");
		//var row = table.row(tr);
		var row = table.api(true).row(tr);
		if (row.child.isShown()) {
			row.child.hide();
			tr.removeClass("shown");
		} else {
			row.child(format(row.data())).show();
			tr.addClass("shown");
		}
	});

	$('#Sec_useraccessrpt_tblResults').find("th:last").hide();
	$("#Sec_useraccessrpt_tblResults tr").each(function () {
		$(this).find("td:last").hide();
	});
	$('#Sec_useraccessrpt_tblResults').find('tbody tr td:nth-child(2)').filter(function () {
		var text = $(this).text();
		$(this).html('<a class="active" style="cursor: pointer; pointer-events: all; opacity: 1; color: #3366CC; ">' + text + '</a>');

	});


	$('#Sec_useraccessrpt_tblResults').on('click', '.active', function (e) {
		e.preventDefault();
		var text = $(this).closest("tr td:nth-child(2)").text();
		$('[name=hdnUserId]').val(text);

		"true" == $('input[type=hidden][name=writeUDS]').val() ? function (a) {
			$('form[name=useraccessreport]').attr('action', '/apps/Security/searchUserManage.action');
			$('form[name=useraccessreport]').submit();
		}() : "true" == $('input[type=hidden][name=readUDS]').val() ? function (q) {
			$('form[name=useraccessreport]').attr('action', '/apps/Security/searchUserView.action');
			$('form[name=useraccessreport]').submit();
		}() : "false" == $('input[type=hidden][name=readUDS]').val() && function (e) {
		}();

	});
	

	$('#cnsprintheader').on('click', '#downloadReports', function (e) {
		e.preventDefault();
		$('form[name=useraccessreport]').attr('action', '/apps/Security/downloadUserAccessReport.action');
		$('form[name=useraccessreport]').submit();

	});
	
	$('#cnsprintheader').on('click', '#searchReports', function (e) {
		e.preventDefault();
		disableButtons();
		$('form[name=useraccessreport]').attr('action', '/apps/Security/searchUserAccessReports.action');
		$('form[name=useraccessreport]').submit();

	});
	
	$('#cnsprintheader').on('click', '#clearUserAccessReports', function (e) {
		 e.preventDefault();
		 disableButtons();
		$('form[name=useraccessreport]').attr('action', '/apps/Security/clearUserAccessReports.action');
		$('form[name=useraccessreport]').submit();

	});
	
	$('form[name=useraccessreport]').submit(function(event) {
	    event.preventDefault();
	    var val = $(this).find('input[type="text"]').val();
		
		this.submit();
	    
		
	});

	//$('#Sec_useraccessrpt_tblResults').find('td:last-child').remove();
	var selectedVal = $("#useraccessreport_selectedAvailableApplication option:selected").val();
	if(selectedVal === '0' || selectedVal == undefined){
	jQuery('#permissions').attr("disabled", "disabled");
	//jQuery('#roles').attr("disabled", "disabled");
	}else{
		var options = {value : selectedVal};
		populateRoleAndPermission(options,true);
		
	}
	jQuery('#lastLoginDateFrom').datepicker({
		showOn: "both",
		buttonImage: "/common/jquery/js/calendar.gif",
		buttonImageOnly: true,
		changeMonth: true,
		changeYear: true,
		buttonText: ""
	});

	jQuery('#lastLoginDateTo').datepicker({
		showOn: "both",
		buttonImage: "/common/jquery/js/calendar.gif",
		buttonImageOnly: true,
		changeMonth: true,
		changeYear: true,
		buttonText: ""
	});

	jQuery('#lastUpdatedDateFrom').datepicker({
		showOn: "both",
		buttonImage: "/common/jquery/js/calendar.gif",
		buttonImageOnly: true,
		changeMonth: true,
		changeYear: true,
		buttonText: ""
	});

	jQuery('#lastUpdatedDateTo').datepicker({
		showOn: "both",
		buttonImage: "/common/jquery/js/calendar.gif",
		buttonImageOnly: true,
		changeMonth: true,
		changeYear: true,
		buttonText: ""
	});
	$('.dataTables_wrapper .dataTables_filter INPUT').bind("mouseup", function() {
        var $input = $(this);
        var oldValue = $input.val();
        if (oldValue == "") {
            return;
        }
        setTimeout(function() {
            var newValue = $input.val();
            if (newValue == "") {
                $input.trigger("keyup");
            }
        }, 1);
    });
});


function populateAllAppsRoles(){
	jQuery('#ajaxBackground').css('display', 'block');
	jQuery.ajax({
		url: 'manageAllAppRoles.action',
		type: 'POST',
		cache: false,
		dataType: 'json',
		success: function (response) {
			var id = '#roles';
			var zeroIndexValue = '';
			createDropdown(id, zeroIndexValue, response.roles);
			jQuery('#ajaxBackground').css('display', 'none');
		},
		error: function (error) {
			/* jQuery(settings.ele).next().removeClass('loader');
			jQuery(settings.ele).next().removeAttr('disabled'); */
			jQuery('#ajaxBackground').css('display', 'none');
			//console.log('error in populateLocations');
		}
	});
}

function populateRoleAndPermission(options,isSelectedApplication) {
	if (options.value == "0") {
		//createDropdown('#roles', '- None -', undefined);
		createDropdown('#permissions', '- None -', undefined);
		jQuery('#permissions').attr('disabled', true);
		populateAllAppsRoles();
		//jQuery('#roles').attr('disabled', true);
		return;
	}
	jQuery('#permissions').attr('disabled', false);
	jQuery('#roles').attr('disabled', false);
	var thisvalue = jQuery(options).find("option:selected").text();
	jQuery('#ajaxBackground').css('display', 'block');
	jQuery.ajax({
		url: 'manageApplicationRolesAndPermission.action',
		data: {
			applicationId: options.value,
			applicationName: thisvalue
		},
		type: 'POST',
		cache: false,
		dataType: 'json',
		success: function (response) {
			var id = '#roles';
			var zeroIndexValue = '- None -';
			createDropdown(id, zeroIndexValue, response.roles);
			createDropdown('#permissions', '- None -', response.permissions);
			if(isSelectedApplication){
				 $("#permissions").val($('[name=hiddenPermission]').val());
				 $("#roles").val($('[name=hiddenSpecialRole]').val());
				}
			jQuery('#ajaxBackground').css('display', 'none');
		},
		error: function (error) {
			/* jQuery(settings.ele).next().removeClass('loader');
			jQuery(settings.ele).next().removeAttr('disabled'); */
			jQuery('#ajaxBackground').css('display', 'none');
			//console.log('error in populateLocations');
		}
	});
}

function createDropdown(id, zeroIndexValue, response) {
	jQuery(id).empty();
	zeroIndexValue==='' ? '' : jQuery(id).append("<option value='0'>" + zeroIndexValue + "</option>");
	if (response != undefined) {
		jQuery.each(response, function (index, value) {
			var arr = value[0].split('|');
			jQuery(id).append("<option value='" + arr[0] + "'>" + arr[1] + "</option>");
		});
	}
}

function format(d) {
	var t = [];
	var obj = eval('(' + d[12] + ')');
	t.push('<table class="child toggleimg" cellpadding="5" cellspacing="0"  style="border:1px solid silver;margin-left:-38em;">');
	t.push('<tr>');
	t.push('<td style="text-align:left;"><b>Application</b></td>');
	t.push('<td style="text-align:left;"><b>Permission/Special Role</b></td>');
	t.push('<td><b>Read</b></td>');
	t.push('<td><b>Add</b></td>');
	t.push('<td><b>Update</b></td>');
	t.push('<td><b>Delete</b></td>');
	t.push('</tr>');
	if(obj.length>0){
	for (var i in obj) {
		t.push('<tr>');
		obj[i].applicationName==="" ? t.push('<td style="text-align:left;">&nbsp;</td>') : t.push('<td style="text-align:left;">' + obj[i].applicationName + '</td>');
		obj[i].permissionName=== "" ? t.push('<td style="text-align:left;">&nbsp;</td>') : t.push('<td style="text-align:left;">' + obj[i].permissionName + '</td>');
		obj[i].readLevel === true ? t.push('<td style=text-align:center>X</td>') : t.push('<td style=text-align:center>&nbsp;</td>')
		obj[i].writeLevel === true ? t.push('<td style=text-align:center>X</td>') : t.push('<td style=text-align:center>&nbsp;</td>')
		obj[i].updateLevel === true ? t.push('<td style=text-align:center>X</td>') : t.push('<td style=text-align:center>&nbsp;</td>')
		obj[i].deleteLevel === true ? t.push('<td style=text-align:center>X</td>') : t.push('<td style=text-align:center>&nbsp;</td>')
		t.push('</tr>');

	}
	}else{
		t.push('<tr>');
		t.push('<td style="text-align:left;">No record found.</td>');
		t.push('</tr>');
	}
	t.push('</table>');
	return t.join("");
}

function radioOnClickEventFunction(value){
	var radioValue = $("input[name='displayUserListOnly']:checked").val();	
			if(radioValue=='1'){
				$(".toggleimg").hide();
			}else{
				$(".toggleimg").show();
			}		
}

function startDownload(form) {
	var token = new Date().getTime();
	$('input[type=hidden][name=hiddenToken]').val(token);
	$(':button').prop('disabled', true);

	var pollDownload = setInterval(function() {
		/*if (document.cookie.indexOf("DRSSHEET=" + token) > -1) {
			document.cookie = "DRSSHEET=" + token + "; expires="
					+ new Date(0).toGMTString() + "; path=/";*/
			enableButtons();
			clearInterval(pollDownload);
		//}
	}, 5000);
}

function enableButtons() {
	var node_list = document.getElementsByTagName('input');

	for (var i = 0; i < node_list.length; i++) {
		var node = node_list[i];

		if (node.getAttribute('type') == 'submit') {
			node.disabled = false;
		}
	}
}