function verifyPage() {
	if ( document.all.userType.value != "I" )
	{
		if(document.all.selectedAvailableLogos!=null && document.all.selectedLogos!=null){
		doSelectAllInList(document.all.selectedAvailableLogos);
		doSelectAllInList(document.all.selectedLogos);
		}
		if(document.all.availableOrgIds!=null && document.all.selectedOrgIds!=null){
		doSelectAllInList(document.all.availableOrgIds);
		doSelectAllInList(document.all.selectedOrgIds);
		}
	
		if (document.all.selectedLogos!=null && document.all.selectedLogos.options.length == 0) {
			doUnSelectAllInList(document.all.selectedAvailableLogos);
			alert("You must select at least 1 logo.");
			return false;
		}
		
		if (document.all.availableOrgIds!=null && document.all.availableOrgIds.options.length != 0 && document.all.selectedOrgIds!=null && document.all.selectedOrgIds.options.length == 0) {
			doUnSelectAllInList(document.all.availableOrgIds);
			/*alert("You must select at least 1 OrgID.");
			return false;*/
		}
	}

	return true;
}



