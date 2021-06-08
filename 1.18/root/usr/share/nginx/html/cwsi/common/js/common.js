
function viewClientIdLogoSelect(selectedOption) {

	hideAllDivs();
	show(selectedOption.options[selectedOption.selectedIndex].value);
}

function viewClientIdLogoRadio(selectedRadioButton) {
	if(selectedRadioButton != null){
		for ( i=0;i<selectedRadioButton.length;i++)
		{
			if ( selectedRadioButton[i].checked)
			{
				viewClientIdLogo(selectedRadioButton[i]);
				return true;
			}
		}
	}
}

function viewClientIdLogo(selectedRadioButton) {

	hideAllDivs();
	show(selectedRadioButton.value);
}

function hideAllDivs() {
	hide("SELECTLOGO");
	hide("SELECTCLIENTID");
	hide("ENTERLOGO");
	hide("ENTERCLIENTID");
}

function logoClientSelected(input, form)
{
	var selectedItem = input.options[input.selectedIndex].value;

	if ( input.name == "logo" )
	{
		selectItemInList(form.clientId, selectedItem);
	}
	else
	{
		selectItemInList(form.logo, selectedItem);
	}

}


function openHelp(appName, pageHelp)
{
	if ( window.name!="main" )
		window.opener.OpenManagedAppWindow('/HelpViewer/helpviewer/view.do?appName='+appName+'&pageHelp='+pageHelp, 'help'+appName, 'resizable=yes,scrollbars=no,menubar=no,toolbar=no,status=no,width=600,height=260,screenX=200,screenY=200,top=200,left=200',false);
	else
		parent.windowManager.OpenManagedAppWindow('/HelpViewer/helpviewer/view.do?appName='+appName+'&pageHelp='+pageHelp, 'help'+appName, 'resizable=yes,scrollbars=no,menubar=no,toolbar=no,status=no,width=600,height=260,screenX=200,screenY=200,top=200,left=200',false);

	return false;
}


//////////////////////////////////////////////
// Disables all links on a page.            //
//////////////////////////////////////////////

function disableAllLinks()
{
   var allLinks=document.links;
   //iterate over the all links
   for(i = allLinks.length-1; i > -1; --i){
       if(allLinks[i]){
           allLinks[i].onclick = function(){return false;}
       }
   }
}

///////////////////////////////////////////////////
// Disable all links with identical Hrefname     //
// if disableLink paramter is true then          //
// disable the alllink whose href name is        //
// equal to hrefName parameter                   //
//////////////////////////////////////////////////

function disableLink(hrefName, disableLink)
{
   var links = document.getElementsByName(hrefName);
   for(i=0;i<links.length;i++){
       if(disableLink){
          links[i].onclick=function(){return false;};
     	 } else {
           links[i].onclick=function(){return true;};
     	}
   }
}

