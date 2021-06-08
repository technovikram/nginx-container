function verifyPage() {
	var i = 0;
	while(true){
		var selectFiids = "\"lnetFiids["+i+"].selectedfiids\"";
		if(document.all(eval(selectFiids)) == null){
			break;
		}else{
			doSelectAllInList(document.all(eval(selectFiids)));
		}
		i++;
	}
	if(document.all.availableOrgIds!=null && document.all.selectedOrgIds!=null){
		doSelectAllInList(document.all.availableOrgIds);
		doSelectAllInList(document.all.selectedOrgIds);
		}
	
	if (document.all.availableOrgIds != null && document.all.availableOrgIds.options.length != 0 && document.all.selectedOrgIds!=null && document.all.selectedOrgIds.options.length == 0) {
		doUnSelectAllInList(document.all.availableOrgIds);
		/*alert("You must select at least 1 OrgID.");
		return false;*/
	}
	return true;

}


