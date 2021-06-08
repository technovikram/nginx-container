function verifyPage() {
	return true;
}

function changeCountryA(country) {
	if (country == "USA") {
		document.all.divStateListA.style.display = "inline";
		document.all.divStateTextA.style.display = "none";
	} else {
		document.all.divStateListA.style.display = "none";
		document.all.divStateTextA.style.display = "inline";
	}
}

function changeCountryU(country) {
	if (country == "USA") {
		document.all.divStateListU.style.display = "inline";
		document.all.divStateTextU.style.display = "none";
	} else {
		document.all.divStateListU.style.display = "none";
		document.all.divStateTextU.style.display = "inline";
	}
}

function changeCountryD(country) {
	if (country == "USA") {
		document.all.divStateListD.style.display = "inline";
		document.all.divStateTextD.style.display = "none";
	} else {
		document.all.divStateListD.style.display = "none";
		document.all.divStateTextD.style.display = "inline";
	}
}

function changeCountryO(country) {
	if (country == "USA") {
		document.all.divStateListO.style.display = "inline";
		document.all.divStateTextO.style.display = "none";
	} else {
		document.all.divStateListO.style.display = "none";
		document.all.divStateTextO.style.display = "inline";
	}
}

function changeView(view) {
	if (view == 'new') {
		document.all.divShippingAddress.style.display = 'inline';
		document.all.divShippingHeader.style.display  = 'inline';
		document.all.divReplaceInfo.style.display     = 'none';
		document.all.divReassignHeader.style.display  = 'none';
	}

	if (view == 'reassign') {
		document.all.divShippingAddress.style.display = 'none';
		document.all.divShippingHeader.style.display  = 'none';
		document.all.divReplaceInfo.style.display     = 'inline';
		document.all.divReassignHeader.style.display  = 'inline';
	}
	if (view == 'none') {
		document.all.divShippingAddress.style.display = 'none';
		document.all.divShippingHeader.style.display  = 'none';
		document.all.divReplaceInfo.style.display     = 'none';
		document.all.divReassignHeader.style.display  = 'none';
	}
}

function checkReplace() {
	if (document.all.tokenAction.checked) {
		document.all.divReasonLabel.style.display     = 'inline';
		document.all.divReasonList.style.display      = 'inline';
		document.all.divShippingHeader.style.display  = 'inline';
		document.all.divShippingAddress.style.display = 'inline';

	} else {
		document.all.replacementReason.selectedIndex  = 0;
		document.all.divReasonLabel.style.display     = 'none';
		document.all.divReasonList.style.display      = 'none';
		document.all.divShippingHeader.style.display  = 'none';
		document.all.divShippingAddress.style.display = 'none';
	}
}

function changeRequestToken() {
	var tokenval;
	for ( var i = 0; i < document.all.tokenAction.length; i++) {
		if (document.all.tokenAction[i].checked) {
			tokenval = document.all.tokenAction[i].value;
			break;
		}
	}
	if (document.all.generateSoftTokens != null) {
		if (document.all.generateSoftTokens.checked) {
			document.all.generateSoftTokensdiv.style.display = 'inline';
		}
	}
	if (document.all.tokenAction != null) {
		if (tokenval == "3") { // Replace
			document.all.divReasonLabel.style.display = 'inline';
			document.all.divReasonList.style.display = 'inline';
			document.all.divShippingHeader.style.display = 'inline';
			document.all.divShippingAddress.style.display = 'inline';
			document.all.divReassignHeader.style.display = 'none';
			document.all.divReplaceInfo.style.display = 'none';
		} else if (tokenval == "4") { // Re-assign
			document.all.divReasonLabel.style.display = 'none';
			document.all.divReasonList.style.display = 'none';
			document.all.divShippingHeader.style.display = 'none';
			document.all.divShippingAddress.style.display = 'none';
			document.all.divReassignHeader.style.display = 'inline';
			document.all.divReplaceInfo.style.display = 'inline';
			document.all.keepcurrenttoken.style.display='inline';
		} else if (tokenval == "0") { // None
			document.all.divReasonLabel.style.display = 'none';
			document.all.divReasonList.style.display = 'none';
			document.all.divShippingHeader.style.display = 'none';
			document.all.divShippingAddress.style.display = 'none';
			document.all.divReassignHeader.style.display = 'none';
			document.all.divReplaceInfo.style.display = 'none';
		}
	}
}

function changeReqTokenDisplay(param) {
	

		if (param == "1") {
		document.all.divShippingAddress.style.display = 'inline';
		document.all.divShippingHeader.style.display = 'inline';
		document.all.divReplaceInfo.style.display = 'none';
		document.all.divReassignHeader.style.display = 'none';
		document.all.divReassignHeader.style.display = 'none';
		document.all.divReplaceInfo.style.display = 'none';
		document.all.keepcurrenttoken.style.display = 'none';
	}
		if(param == "3"){ //Replace
			document.all.divReasonLabel.style.display='inline';		
			document.all.divReasonList.style.display='inline';		
			document.all.divShippingHeader.style.display='inline';		
			document.all.divShippingAddress.style.display='inline';		
			document.all.divReassignHeader.style.display='none';
			document.all.divReplaceInfo.style.display='none';
			document.all.keepcurrenttoken.style.display='none';
		}else if(param == "4") { //Re-assign
			document.all.divReasonLabel.style.display='none';		
			document.all.divReasonList.style.display='none';		
			document.all.divShippingHeader.style.display='none';		
			document.all.divShippingAddress.style.display='none';		
			document.all.divReassignHeader.style.display='inline';
			document.all.divReplaceInfo.style.display='inline';
			document.all.keepcurrenttoken.style.display='inline';			
		}else if(param == "0"){ //None
			document.all.divReasonLabel.style.display='none';		
			document.all.divReasonList.style.display='none';		
			document.all.divShippingHeader.style.display='none';		
			document.all.divShippingAddress.style.display='none';		
			document.all.divReassignHeader.style.display='none';
			document.all.divReplaceInfo.style.display='none';
			document.all.keepcurrenttoken.style.display='none';
		}
}

function viewShippingAddress(address) {

	if (address == 'administrator') {
		document.all.divAdminAddress.style.display   = 'inline';
		document.all.divUserAddress.style.display    = 'none';
		document.all.divDefaultAddress.style.display = 'none';
		document.all.divOtherAddress.style.display   = 'none';
	}

	if (address == 'user') {
		document.all.divAdminAddress.style.display   = 'none';
		document.all.divUserAddress.style.display    = 'inline';
		document.all.divDefaultAddress.style.display = 'none';
		document.all.divOtherAddress.style.display   = 'none';
	}

	if (address == 'default') {
		document.all.divAdminAddress.style.display   = 'none';
		document.all.divUserAddress.style.display    = 'none';
		document.all.divDefaultAddress.style.display = 'inline';
		document.all.divOtherAddress.style.display   = 'none';
	}

	if (address == 'other') {
		document.all.divAdminAddress.style.display   = 'none';
		document.all.divUserAddress.style.display    = 'none';
		document.all.divDefaultAddress.style.display = 'none';
		document.all.divOtherAddress.style.display   = 'inline';
	}
}

function generateSoftTokensfunction(checkValue) {
	
	if (checkValue == true) {
		var pendingSoftToken = document.getElementById('pendingSoftToken').value;
		if (pendingSoftToken == "true") {
			
			// Fix for JIRA USERADMIN-385 
			var input = confirm("User has a pending soft token request. If it has not been activated, requesting another soft token will generate an email with a new activation code that replaces the one provided previously.");
			if (input == true) {
				document.all.generateSoftTokensdiv.style.display = 'inline';
			} else {
				document.getElementById('generateSoftTokens').checked = false;
				document.all.generateSoftTokensdiv.style.display = 'none';
			}
		} else {
			document.all.generateSoftTokensdiv.style.display = 'inline';
		}
	} else {
		document.all.generateSoftTokensdiv.style.display = 'none';
	}
}

