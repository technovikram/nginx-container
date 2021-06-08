//radioButtonOnClick function
var templateMsg = document.getElementById('template_message_div');
function radioButtonOnClick(value,value1){
if(value=="true"){
	if(document.getElementById('resultTablediv')){
	document.getElementById('resultTablediv').innerHTML="";
	}
	if(document.getElementById('cardValetAppTokenTablediv')){
		document.getElementById('cardValetAppTokenTablediv').innerHTML="";
	}
	while (templateMsg.hasChildNodes()) {
    templateMsg.removeChild(templateMsg.firstChild);
	}
	document.getElementById('searchFI').value="";
	document.getElementById('instIdDiv').style.display="inline";
	document.getElementById('digitalCertIdDiv').style.display="none";
	document.getElementById('deleteDigitalCertIdButton').style.display="none";
	document.getElementById('addCardValetButton').style.display="none";
	}
else if(value=="false"){
	if(document.getElementById('resultTablediv')){
	document.getElementById('resultTablediv').innerHTML="";
	}
	if(document.getElementById('cardValetAppTokenTablediv')){
		document.getElementById('cardValetAppTokenTablediv').innerHTML="";
	}
	while (templateMsg.hasChildNodes()) {
    templateMsg.removeChild(templateMsg.firstChild);
	}
	document.getElementById('searchFI').value="";	
	document.getElementById('instIdDiv').style.display="none";
	document.getElementById('digitalCertIdDiv').style.display="inline";
	document.getElementById('deleteDigitalCertIdButton').style.display="inline";
	document.getElementById('addCardValetButton').style.display="inline";
	document.getElementById('addCardValetButton').disabled="true";
	}
}

//function showHideResulDivOnClick begins .
function showHideButton(value){
	if(value=="false"){
	document.getElementById('deleteDigitalCertIdButton').style.display="inline";
	document.getElementById('digitalCertIdDiv').style.display="inline";
	document.getElementById('addCardValetButton').style.display="inline";
	}
	else if(value=="true"){
	document.getElementById('deleteDigitalCertIdButton').style.display="none";
	document.getElementById('addCardValetButton').style.display="none";
	document.getElementById('instIdDiv').style.display="inline";
	}
}

//function checkDelete begins .
function checkDelete(value) {
	if(value=="false"){
	return confirm("Are you sure you want to delete this Digital Certificate ID?");
	}else if(value=="true"){
	return confirm("Are you sure you want to delete this Institution ID?");
	}
}

//function checkDeleteAppToken begins .
function checkDeleteAppToken() {
	var appListSelection=document.getElementById("appTokenList").selectedIndex;
	if(appListSelection!=0){
		return confirm("Are you sure you want to delete this App Token?");
	}
}

//function to set the App Name
function getAppName()
{
var appList=document.getElementById("appTokenList");
var selectedAppKey=appList[appList.selectedIndex].value;
if(document.getElementById(selectedAppKey)!='undefined' && document.getElementById(selectedAppKey)!=null)
{
var appName=document.getElementById(selectedAppKey).value;
document.getElementById("appName").value=appName;
}
}


//function to clear the text fields
function clearAppName()
{
document.getElementById("appName").value="";
document.getElementById("password").value = "";
document.getElementById("rePassword").value = "";
}


//function to view the app token info
function getAppTokenInfo()
{
	hiddenformfield("action", "appTokenInfo", document.forms[0]);
	document.forms[0].submit();
}

//function to match value of password and rePassword fields
function matchPassword() {
	element1 = document.getElementById("password").value;
	element2 = document.getElementById("rePassword").value;
	if (element1 != element2) {
		alert("Password do not match. Please re-enter the password");
		document.getElementById("password").value = "";
		document.getElementById("rePassword").value = "";
		document.getElementById("password").focus();
	}
	
}

//function is used to clean the password and re-password text box.
function clearAppInfo() {
	if (document.getElementById('appTokenCheckBox').checked) {
		document.getElementById("appName").value="";
		document.getElementById('password').value = "";
		document.getElementById('rePassword').value = "";
	}
}

(function($) {
	jQuery.noConflict();
	jQuery(document).ready(function() {
		if ($('[name=ssoEnabledFlag] option:selected').val() == 'Y') {
			$('#ssosystemidLabelTd').show();
			$('#ssosystemidTextTd').show();
		} else {
			$('#ssosystemidLabelTd').hide();
			$('#ssosystemidTextTd').hide();
		}
		$('[name=ssoEnabledFlag]').change(function() {
			//alert(this.value);
			if (this.value == 'Y') {
				$('#ssosystemidLabelTd').show();
				$('#ssosystemidTextTd').show();

			} else if (this.value == 'N') {
				$('#ssosystemidTextTd').hide();
				$('#ssosystemidLabelTd').hide();
				$('[name=ssoSystemId]').val('');
			}
		});

	});
})(jQuery);
	 
