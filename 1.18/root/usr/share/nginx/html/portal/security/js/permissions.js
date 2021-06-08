function verifyPage() {
	return true;
}

function toggleCheckBoxes(flag) {
	for (i=0; i<document.forms[0].elements.length; i++) {
		if (document.forms[0].elements[i].type == 'checkbox' && !document.forms[0].elements[i].disabled) {
			document.forms[0].elements[i].checked = flag;
		}
	}
}

function toggleReadCheckBoxes() {
	for (i=0; i<document.forms[0].elements.length; i++) {
		if (document.forms[0].elements[i].type == 'checkbox' && !document.forms[0].elements[i].disabled) {
			var len = document.forms[0].elements[i].name.length;
			sub = len - 9;
			if (document.forms[0].elements[i].name.substring(sub) == "readLevel") {
				document.forms[0].elements[i].checked = true;
			} else {
				document.forms[0].elements[i].checked = false;			
			}
		}
	}
}

function resetPage() {
	hiddenformfield("action", "resetPermissions", document.forms[0]);
	createCancel(document.forms[0]);
	document.forms[0].submit();
}