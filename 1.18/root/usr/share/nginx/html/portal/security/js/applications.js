function verifyPage() {
	doSelectAllInList(document.all.selectedAvailableApplications);
	doSelectAllInList(document.all.selectedSelectedApplications);

	if (document.all.selectedSelectedApplications.options.length == 0) {
		doUnSelectAllInList(document.all.selectedAvailableApplications);
		alert("You must select at least 1 application.");
		return false;
	}

	return true;
}

function verifyPageBackButton() {
	doSelectAllInList(document.all.selectedAvailableApplications);
	doSelectAllInList(document.all.selectedSelectedApplications);

	return true;
}