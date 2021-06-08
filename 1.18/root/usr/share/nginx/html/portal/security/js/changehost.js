function verifyPage() {
	if (document.all.newUserNumber.value == "") {
		alert("You must enter a user number.");
		return false;
	}

	if (document.all.previousPortalUserID.value == "") {
		alert("You must enter a previous user ID.");
		return false;
	}

	return true;
}

function confirmSave() {

	if(verifyPage())
	{
		
	     return confirm("Are you sure you want to make these changes?");

	}
	else

	{
		return false;
	}
	
}