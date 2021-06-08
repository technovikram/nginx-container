function setTokenEvents() {

	//CR2622 Soft Token second phase Changes.
	if (document.all["userRequestType"].selectedIndex == 0) {
		
		document.all["tokenRequestType"].options.length = 0;
		document.all["tokenRequestType"].options[0] = new Option('- None -', '');
		document.all["tokenRequestType"].options[1] = new Option(
				'Issue new hard token', '1');
		document.all["tokenRequestType"].options[2] = new Option(
				'Unassign hard token', '2');
		document.all["tokenRequestType"].options[3] = new Option(
				'Replace hard token', '3');
		document.all["tokenRequestType"].options[4] = new Option(
				'Assign Existing hard token', '4');
		document.all["tokenRequestType"].options[5] = new Option(
				'Issue new soft token', '5');
		document.all["tokenRequestType"].options[6] = new Option(
				'Remove soft token', '6');
		document.all["tokenRequestType"].options[7] = new Option(
				'Activate soft token', '7');
		document.all["tokenRequestType"].options[8] = new Option(
				'Expire soft token', '8');
		document.all["tokenRequestType"].options[9] = new Option(
				'Add SSO (SAML)', '9');
		document.all["tokenRequestType"].options[10] = new Option(
				'Update SSO (SAML)', '10');
		document.all["tokenRequestType"].options[11] = new Option(
				'Delete SSO (SAML)', '11');

	}
	if (document.all["userRequestType"].selectedIndex == 1) {
		
		document.all["tokenRequestType"].options.length = 0;
		document.all["tokenRequestType"].options[0] = new Option('- None -', '');
		document.all["tokenRequestType"].options[1] = new Option(
				'Issue new hard token', '1');
		document.all["tokenRequestType"].options[2] = new Option(
				'Assign Existing hard token', '4');
		document.all["tokenRequestType"].options[3] = new Option(
				'Issue new soft token', '5');
		document.all["tokenRequestType"].options[4] = new Option(
				'Add SSO (SAML)', '9');
	}
	if (document.all["userRequestType"].selectedIndex == 2) {
		document.all["tokenRequestType"].options.length = 0;
		document.all["tokenRequestType"].options[0] = new Option('- None -', '');
		document.all["tokenRequestType"].options[1] = new Option(
				'Unassign hard token', '2');
		document.all["tokenRequestType"].options[2] = new Option(
				'Remove soft token', '6');
		document.all["tokenRequestType"].options[3] = new Option(
				'Delete SSO (SAML)', '11');
	}
	if (document.all["userRequestType"].selectedIndex == 3) {
		
		document.all["tokenRequestType"].options[0] = new Option('- None -', '');
		document.all["tokenRequestType"].options[1] = new Option(
				'Issue new hard token', '1');
		document.all["tokenRequestType"].options[2] = new Option(
				'Unassign hard token', '2');
		document.all["tokenRequestType"].options[3] = new Option(
				'Replace hard token', '3');
		document.all["tokenRequestType"].options[4] = new Option(
				'Assign Existing hard token', '4');
		document.all["tokenRequestType"].options[5] = new Option(
				'Issue new soft token', '5');
		document.all["tokenRequestType"].options[6] = new Option(
				'Remove soft token', '6');
		document.all["tokenRequestType"].options[7] = new Option(
				'Activate soft token', '7');
		document.all["tokenRequestType"].options[8] = new Option(
				'Expire soft token', '8');
		document.all["tokenRequestType"].options[9] = new Option(
				'Update SSO (SAML)', '10');
	}

}

function setTokenRequestType() {
	
	var tokenIndex = document.all["tokenRequestType"].selectedIndex;
	var userIndex = document.all["userRequestType"].selectedIndex;
	setTokenEvents();
	if (userIndex == 0) {
		document.all["tokenRequestType"].selectedIndex = tokenIndex;
	}else {
		
		if(userIndex==0||userIndex==3){
			document.all["tokenRequestType"].selectedIndex = tokenIndex;
		}
		else if(userIndex==1){
				if(tokenIndex==4){

				document.all["tokenRequestType"].selectedIndex =2 ;
				}else if(tokenIndex==5){
				document.all["tokenRequestType"].selectedIndex =3 ;
				}else{
					document.all["tokenRequestType"].selectedIndex=tokenIndex ;
				}
		}
		else if(userIndex==2){
				if(tokenIndex==2){
				document.all["tokenRequestType"].selectedIndex =1 ;
				}else if(tokenIndex==6){
				document.all["tokenRequestType"].selectedIndex =2 ;
				}else{
					document.all["tokenRequestType"].selectedIndex=tokenIndex ;
				}
		}
		
		
	}
}