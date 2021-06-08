function verifyPage() {
	return true;
}

function isWalletUser() {
	var checkFlag = document.all.walletAppUser.checked;
	if (checkFlag) {
		document.getElementById("portalUserID").value = document
				.getElementById("hiddenWalletUserId").value;
	} else {
		document.getElementById("portalUserID").value = "";
		document.getElementById("password").value = "";
		document.getElementById("rePassword").value = "";
	}
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
		if (document.getElementById("forcePasswordExpiration") != null)
			document.getElementById("forcePasswordExpiration").checked = false;
	} else if (document.getElementById("forcePasswordExpiration") != null) {
		document.getElementById("forcePasswordExpiration").checked = true;
	}

}

function showHidePassword() {

	if ((document.all.accessMethod[1] != null && document.all.accessMethod[1].checked)
			&& !(document.all.origUserType.value == 'webServices')) {
		if (document.getElementById("directpwd1") != null)
			document.getElementById("directpwd1").style.display = 'block';
		if (document.getElementById("directpwd2") != null)
			document.getElementById("directpwd2").style.display = 'block';
		if (document.getElementById("directpwd3") != null)
			document.getElementById("directpwd3").style.display = 'block';
		if (document.getElementById("directpwd4") != null)
			document.getElementById("directpwd4").style.display = 'block';
		if (document.getElementById("directpwd5") != null)
			document.getElementById("directpwd5").style.display = 'block';
		if (document.getElementById("directpwd6") != null)
			document.getElementById("directpwd6").style.display = 'block';

	} else {
		if (document.getElementById("directpwd1") != null)
			document.getElementById("directpwd1").style.display = 'none';
		if (document.getElementById("directpwd2") != null)
			document.getElementById("directpwd2").style.display = 'none';
		if (document.getElementById("directpwd3") != null)
			document.getElementById("directpwd3").style.display = 'none';
		if (document.getElementById("directpwd4") != null)
			document.getElementById("directpwd4").style.display = 'none';
		if (document.getElementById("directpwd5") != null)
			document.getElementById("directpwd5").style.display = 'none';
		if (document.getElementById("directpwd6") != null)
			document.getElementById("directpwd6").style.display = 'none';
	}

}

function clearUserId() {
	document.getElementById("portalUserID").value = "";
}

// Function to open the popup window for Multi Client Search Map.

function showClientIdPopup(formId, action, clientId) {
	document.getElementById("hiddenClientId").value = clientId;
	var formData = $("#" + formId).serialize();
	$.ajax({
		url : 'apps/Security/' + action + '.action',
		data : formData,
		type : "POST",
		success : function(response) {
			$('#manageClientId').html(response);

		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {

		}
	});

	document.getElementById("manageClientId").style.display = "block";
	disableMainWindowPopup();
	// document.getElementById("primaryId").innerHTML =clientId;
	setHiddenValues();

}

// Function call to closed the popup.
function hidePopup(popupId) {
	document.getElementById(popupId).style.display = "none";
	enableMainWindowPopup();

}

// Function called to move the selected client ids to right list.
function moveRight() {
	moveSelectedOptions(document
			.getElementById('selectedAvailableClientIdList'), document
			.getElementById('selectedSelectedClientIdList'), false);
	sortSelect(document.getElementById('selectedAvailableClientIdList'), true);
	sortSelect(document.getElementById('selectedSelectedClientIdList'), true);
	setHiddenValues();
	return false;
}

function setHiddenValues() {
	var len = document.getElementById("selectedAvailableClientIdList").length;
	var selectedLen = document.getElementById("selectedSelectedClientIdList").length;
	var selecedHiddenValue;
	var availableHiddenValue;
	for (var i = 0; i < len; i++) {
		if (availableHiddenValue != null && availableHiddenValue != undefined) {
			availableHiddenValue = availableHiddenValue
					+ ","
					+ document.getElementById("selectedAvailableClientIdList")[i].value;
		} else {
			availableHiddenValue = document
					.getElementById("selectedAvailableClientIdList")[i].value;
		}

	}
	if (availableHiddenValue != null && availableHiddenValue != undefined) {
		document.getElementById("availableHiddenValue").value = availableHiddenValue;
	} else {
		document.getElementById("availableHiddenValue").value = "";
	}

	for (var i = 0; i < selectedLen; i++) {
		if (selecedHiddenValue != null && selecedHiddenValue != undefined) {
			selecedHiddenValue = selecedHiddenValue
					+ ","
					+ document.getElementById("selectedSelectedClientIdList")[i].value;
			;
		} else {
			selecedHiddenValue = document
					.getElementById("selectedSelectedClientIdList")[i].value;
		}
	}
	if (selecedHiddenValue != null && selecedHiddenValue != undefined) {
		document.getElementById("selecedHiddenValue").value = selecedHiddenValue;
	} else {
		document.getElementById("selecedHiddenValue").value = "";
	}

}

// Function called to move the all the client ids to right list.
function moveAllRight() {
	moveAllOptions(document.getElementById('selectedAvailableClientIdList'),
			document.getElementById('selectedSelectedClientIdList'), false);
	sortSelect(document.getElementById('selectedAvailableClientIdList'), true);
	sortSelect(document.getElementById('selectedSelectedClientIdList'), true);
	setHiddenValues();
	return false;
}

// Function called to move the selected client ids to left list.
function moveLeft() {
	moveSelectedOptions(
			document.getElementById('selectedSelectedClientIdList'), document
					.getElementById('selectedAvailableClientIdList'), false);
	sortSelect(document.getElementById('selectedAvailableClientIdList'), true);
	sortSelect(document.getElementById('selectedSelectedClientIdList'), true);
	setHiddenValues();
	return false;
}

// Function called to move the all the client ids to left list.
function moveAllLeft() {
	moveAllOptions(document.getElementById('selectedSelectedClientIdList'),
			document.getElementById('selectedAvailableClientIdList'), false);
	sortSelect(document.getElementById('selectedAvailableClientIdList'), true);
	sortSelect(document.getElementById('selectedSelectedClientIdList'), true);
	setHiddenValues();
	return false;

}

function disableMainWindowPopup() {
	var formObj = document.getElementById("appConfigForm");
	var elements = formObj.elements;
	var len = elements.length;
	for (var i = 0; i < len; ++i) {
		if (elements[i] == document.getElementById("manageClientId")
				|| elements[i] == document
						.getElementById("selectedAvailableClientIdList")
				|| elements[i] == document
						.getElementById("selectedSelectedClientIdList")
				|| elements[i] == document.getElementById("clientCancel")
				|| elements[i] == document.getElementById("clientApply")
				|| elements[i] == document.getElementById("moveRightBt")
				|| elements[i] == document.getElementById("moveRightBt")
				|| elements[i] == document.getElementById("moveAllRightBt")
				|| elements[i] == document.getElementById("moveLeftBt")
				|| elements[i] == document.getElementById("moveAllLeftBt")) {
			// alert("enable Element of div");
		} else {
			elements[i].disabled = true;
		}
	}

}

function enableMainWindowPopup() {
	var formObj = document.getElementById("appConfigForm");
	var elements = formObj.elements;
	for (var i = 0, len = elements.length; i < len; ++i) {
		elements[i].disabled = false;
	}

}