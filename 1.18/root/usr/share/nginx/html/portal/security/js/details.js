function changeGroupUser() {
	hiddenformfield("action", "changeGroupUser", document.forms[0]);
	createCancel(document.forms[0]);
	document.forms[0].submit();
}

function verifyPage() {
	return true;
}

function changeUserType(userType) {
	var checkFlag = document.all.sameAsYourself.checked;
	var element1 = document.getElementById("address.institution");
	var element3 = document.getElementById("userAddress.institution");
	if (!checkFlag) {
		if (document.all.userType[1]) {
			if (document.all.userType[1].checked)
				element3.value = element1.value;

		}
	}

	hiddenformfield("action", "loadPageOnUserTypeChange", document.forms[0]);
	document.forms[0].submit();
}

function changeCountry(country) {
	if (country == "USA") {
		document.all.divStateList.style.display = "inline";
		document.all.divStateText.style.display = "none";
	} else {
		document.all.divStateList.style.display = "none";
		document.all.divStateText.style.display = "inline";
	}
}

function changeAddress() {
	var checkFlag = document.all.sameAsYourself.checked;
	var element1 = document.getElementById("address.institution");
	var element2 = document.getElementById("adminAddress.institution");
	var element3 = document.getElementById("userAddress.institution");
	if (checkFlag) {
		if (document.all.userType[1]) {
			if (!document.all.userType[1].checked)
				element3.value = element1.value;
		}
		element1.value = element2.value;
	} else {
		element1.value = element3.value;
	}

	if (document.all.userType[1]) {
		if (document.all.userType[1].checked)
			element1.value = "Fiserv Inc.";
	}

	element1 = document.getElementById("address.address");
	element2 = document.getElementById("adminAddress.address");
	element3 = document.getElementById("userAddress.address");
	if (checkFlag) {
		element3.value = element1.value;
		element1.value = element2.value;
	} else {
		element1.value = element3.value;
	}

	element1 = document.getElementById("address.address2");
	element2 = document.getElementById("adminAddress.address2");
	element3 = document.getElementById("userAddress.address2");
	if (checkFlag) {
		element3.value = element1.value;
		element1.value = element2.value;
	} else {
		element1.value = element3.value;
	}

	element1 = document.getElementById("address.country");
	element2 = document.getElementById("adminAddress.country");
	element3 = document.getElementById("userAddress.country");
	if (checkFlag) {
		element3.value = element1.value;
		element1.value = element2.value;
	} else {
		element1.value = element3.value;
	}

	element1 = document.getElementById("address.city");
	element2 = document.getElementById("adminAddress.city");
	element3 = document.getElementById("userAddress.city");
	if (checkFlag) {
		element3.value = element1.value;
		element1.value = element2.value;
	} else {
		element1.value = element3.value;
	}

	element1 = document.getElementById("address.state");
	element2 = document.getElementById("adminAddress.state");
	element3 = document.getElementById("address.stateText");
	element4 = document.getElementById("userAddress.state");
	element5 = document.getElementById("userAddress.stateText");
	if (checkFlag) {
		element4.value = element1.value;
		element5.value = element3.value;
		element1.value = element2.value;
		element3.value = element2.value;
	} else {
		element1.value = element4.value;
		element3.value = element5.value;
	}

	element1 = document.getElementById("address.zipcode");
	element2 = document.getElementById("adminAddress.zipcode");
	element3 = document.getElementById("userAddress.zipcode");
	if (checkFlag) {
		element3.value = element1.value;
		element1.value = element2.value;
	} else {
		element1.value = element3.value;
	}

	element1 = document.getElementById("address.phone");
	element2 = document.getElementById("adminAddress.phone");
	element3 = document.getElementById("userAddress.phone");
	if (checkFlag) {
		element3.value = element1.value;
		element1.value = element2.value;
	} else {
		element1.value = element3.value;
	}

	element1 = document.getElementById("address.phoneExt");
	element2 = document.getElementById("adminAddress.phoneExt");
	element3 = document.getElementById("userAddress.phoneExt");
	if (checkFlag) {
		element3.value = element1.value;
		element1.value = element2.value;
	} else {
		element1.value = element3.value;
	}

	element1 = document.getElementById("address.fax");
	element2 = document.getElementById("adminAddress.fax");
	element3 = document.getElementById("userAddress.fax");
	if (checkFlag) {
		element3.value = element1.value;
		element1.value = element2.value;
	} else {
		element1.value = element3.value;
	}

	element1 = document.getElementById("address.email");
	element2 = document.getElementById("adminAddress.email");
	element3 = document.getElementById("userAddress.email");
	if (checkFlag) {
		element3.value = element1.value;
		element1.value = element2.value;
	} else {
		element1.value = element3.value;
	}

	changeCountry(document.getElementById("address.country").value);
}

function changePrimary() {
	if ((document.getElementById("primary").checked)) {
		alert("You have chosen to designate this user as the PSA for the institution. The existing PSA will lose the Primary Administrator privilege.");
	}
}

function doNotChangeUserType() {
	if (document.all.userType[0].value == document.all.origUserType.value) {
		document.all.userType[0].checked = true;
	}
	if (document.all.userType[1].value == document.all.origUserType.value) {
		document.all.userType[1].checked = true;
	}
	if (document.all.userType[2].value == document.all.origUserType.value) {
		document.all.userType[2].checked = true;
	}
	alert("User Type can not be modified.");
}

function matchPassword() {
	element1 = document.getElementById("password").value;
	element2 = document.getElementById("rePassword").value;
	if (element1 != element2) {
		alert("Password do not match. Please re-enter the password");
		document.getElementById("password").value = "";
		document.getElementById("rePassword").value = "";
		document.getElementById("password").focus();
	}
	
	checkForcePasswordExpiration();
}

function checkForcePasswordExpiration() {

	var pwd = document.getElementById("password").value;
	if (pwd != null && pwd == '') {
		if(document.getElementById("forcePasswordExpiration")!=null)
		 document.getElementById("forcePasswordExpiration").checked = false;
	} else if(document.getElementById("forcePasswordExpiration")!=null) {
		document.getElementById("forcePasswordExpiration").checked = true;
	}

}

function showHideVisionAndRegion() {

	if (document.getElementById("creditUser").checked) {
		
		if (document.getElementById("omahaCreditUser").checked){
			alert("Either 'Full Service Credit' or 'Credit Services' platform can be selected, but not both.")
			document.getElementById("creditUser").checked = false;
		} else {
			document.getElementById("visionPlusDiv").style.display = 'block';
		}

	} else {

		document.getElementById("visionPlusDiv").style.display = 'none';

	}

}

function showHideOCSAndClientID() {

	if (document.getElementById("omahaCreditUser").checked) {
		
		if (document.getElementById("creditUser").checked){
			alert("Either 'Full Service Credit' or 'Credit Services' platform can be selected, but not both.")
			document.getElementById("omahaCreditUser").checked = false;
			
		} else {
			document.getElementById("ocsDiv").style.display = 'block';
		}
		
	} else {

		document.getElementById("ocsDiv").style.display = 'none';

	}

}

function showHideAccessMethod() {	
	
	if (document.all.origUserType.value == 'webServices') {
if(document.getElementById("accessmethodRow")!=null)
		document.getElementById("accessmethodRow").style.display = 'none';

	} else {
		if(document.getElementById("accessmethodRow")!=null){
		document.getElementById("accessmethodRow").style.display = 'block';
		}
	}
	
	showHidePassword();
}

function showHidePassword(){
	
	if ((document.all.accessMethod[1]!=null && document.all.accessMethod[1].checked) && !(document.all.origUserType.value == 'webServices')){
		if(document.getElementById("directpwd1")!=null)
		document.getElementById("directpwd1").style.display = 'block';
		if(document.getElementById("directpwd2")!=null)
		document.getElementById("directpwd2").style.display = 'block';
		if(document.getElementById("directpwd3")!=null)
		document.getElementById("directpwd3").style.display = 'block';
		if(document.getElementById("directpwd4")!=null)
		document.getElementById("directpwd4").style.display = 'block';
		if(document.getElementById("directpwd5")!=null)
		document.getElementById("directpwd5").style.display = 'block';
		if(document.getElementById("directpwd6")!=null)
		document.getElementById("directpwd6").style.display = 'block';
		
	}else{
		if(document.getElementById("directpwd1")!=null)
			document.getElementById("directpwd1").style.display = 'none';
		if(document.getElementById("directpwd2")!=null)
		document.getElementById("directpwd2").style.display = 'none';
		if(document.getElementById("directpwd3")!=null)
		document.getElementById("directpwd3").style.display = 'none';
		if(document.getElementById("directpwd4")!=null)
		document.getElementById("directpwd4").style.display = 'none';
		if(document.getElementById("directpwd5")!=null)
		document.getElementById("directpwd5").style.display = 'none';
		if(document.getElementById("directpwd6")!=null)
		document.getElementById("directpwd6").style.display = 'none';
	}
	
	
	
}


