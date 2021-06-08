function ignoreKeypress(keyToIgnore) {
	keyPressed = String.fromCharCode(event.keyCode);
	if (keyPressed == keyToIgnore) {
		event.returnValue=false;
	}
}

function doSelectAllInList(theList) {
	for (i=0; i < theList.options.length; i++)
	{
		theList.options[i].selected = true;
	}

	return true;
}

function doUnSelectAllInList(theList) {
	for (i=0; i < theList.options.length; i++)
	{
		theList.options[i].selected = false;
	}

	return true;
}

function confirmCancel(type) {
	if (type == "add")
		confirmText = "Click Ok to exit Add User.";

	if (type == "defaults")
		confirmText = "Click OK to exit Defaults. All changes that you have made will not be applied.";

	if (confirm(confirmText)) {	
		createCancel(document.forms[0]);
		return true;
	} else {
		return false;
	}
}


function deleteUser() {
	if (document.forms[0].chkApproval.checked == false) {
		alert("You must check the approval box before deleting the user. Otherwise, contact your Client Services Representative.");
		return false;
	} else {
		if (confirm("Are you sure you want to delete this user?")) {
			document.all.hidAction.value = "Delete";
			return true;
		} else {
			return false;
		}
	}
}

function updateUser() {
	if (document.forms[0].chkApproval.checked == false) {
		alert("You must check the approval box before updating the user. Otherwise, contact your Client Services Representative.");
		return false;
	}
	document.all.hidAction.value = "Update";
	return true;

}

function saveUser() {
	if (document.forms[0].chkApproval.checked == false) {
		alert("You must check the approval box before updating the user. Otherwise, contact your Client Services Representative.");
		return false;
	}

	document.all.hidAction.value = "Save";
	return true;
}

function cancelUser(mode) {


	if (confirm("Click OK to exit this user record. All changes that you made will not be applied.")) {
		document.all.hidAction.value = "Cancel";
		return true;
	} else {
		return false;
	}
}

function enableUser() {
	if (document.forms[0].chkApproval.checked == false) {
		alert("You must check the approval box before enabling the user. Otherwise, contact your Client Services Representative.");
		return false;
	}
	document.all.hidAction.value = "Enable";
	return true;
}

function disableUser() {
	if (document.forms[0].chkApproval.checked == false) {
		alert("You must check the approval box before disabling the user. Otherwise, contact your Client Services Representative.");
		return false;
	}
	document.all.hidAction.value = "Disable";
	return true;
}

function migrateUser() {
	document.all.hidAction.value = "Migrate";
	return true;
}

function submitUser() {
	var button = findElementByNameValue("action","Update");
	if (button != null)
	   	button.disabled = true;

	button = findElementByNameValue("action","Delete");
	if (button != null)
	   	button.disabled = true;

	button = findElementByNameValue("action","Cancel");
	if (button != null)
	   	button.disabled = true;

	button = findElementByNameValue("action","Save");
	if (button != null)
	   	button.disabled = true;

	button = findElementByNameValue("action","Enable");
	if (button != null)
	   	button.disabled = true;

	button = findElementByNameValue("action","Disable");
	if (button != null)
	   	button.disabled = true;

	button = findElementByNameValue("action","Migrate");
	if (button != null)
	   	button.disabled = true;

	var action = document.all.hidAction.value;

	hiddenformfield("action", action, document.forms[0]);

	return true;
}

function isTime(fieldval, msgText)
{
	re = /^(\d{2}):(\d{2})$/;
	if (re.test(fieldval)) {
		timeArray = re.exec(fieldval);
		hour = timeArray[1];
		minute = timeArray[2];

		if ( hour < 0 || hour > 23 ) {
			alert("Invalid hour in " + msgText + ".");
			return false;
		}

		if ( minute < 0 || minute > 59 ) {
			alert("Invalid minute in " + msgText + ".");
			return false;
		}
	}

	return true;
}

function isStartTimeLessThenEndTime(startTime, endTime)
{
	re = /^(\d{2}):(\d{2})$/;

	if (re.test(startTime) && re.test(endTime)) {
		timeArray = re.exec(startTime);
		sTime = timeArray[1] + timeArray[2];

		timeArray = re.exec(endTime);
		eTime = timeArray[1] + timeArray[2];

		if (sTime > eTime) return false;
	}

	return true;
}


function confirmSecurityCancel(type) {
	if (type == "add")
		confirmText = "Click Ok to exit Add User.";

	if (type == "defaults")
		confirmText = "Click OK to exit Defaults. All changes that you have made will not be applied.";

	if (confirm(confirmText)) {	
		return true;
	} else {
		return false;
	}
}

function enableDisableScheduleSection(){
	if(document.getElementById('scheduleTypeI').checked){
		enableScheduleType();
	}else{
		document.getElementById('scheduleDatepicker').disabled = false;
		document.getElementById('scheduleTime').disabled = false;
		document.getElementById('scheduleTime').className = 'appTextInput';
		document.getElementById('scheduleMeridian').className = 'appTextInput';
		document.getElementById('scheduleMeridian').disabled = false;
		jQuery('#scheduleDatepicker').datepicker('enable');
		jQuery('#scheduleDatepicker').toggleClass('appInputReadonly',false);
		jQuery('#scheduleDatepicker').toggleClass('appTextInput',true);
	}
}
function enableScheduleType(){
	document.getElementById('scheduleDatepicker').disabled = true;
	document.getElementById('scheduleTime').disabled = true;
	document.getElementById('scheduleTime').className = 'appInputReadonly';
	document.getElementById('scheduleDate').value = '';
	document.getElementById('scheduleTime').value = '';
	document.getElementById('scheduleMeridian').disabled = true;
	document.getElementById('scheduleMeridian').className = 'appInputReadonly';
	jQuery('#scheduleDatepicker').datepicker('disable');
	jQuery('#scheduleDatepicker').toggleClass('appTextInput',false);
	jQuery('#scheduleDatepicker').toggleClass('appInputReadonly',true);
}