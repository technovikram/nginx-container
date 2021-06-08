function changeSelectedSystem(system) {
	if (system == "EPOC") {
		document.all.divEPOCPassword.style.display = "inline";
		document.all.divB24Password.style.display = "none";
	} else {
		document.all.divEPOCPassword.style.display = "none";
		document.all.divB24Password.style.display = "inline";
	}
}
