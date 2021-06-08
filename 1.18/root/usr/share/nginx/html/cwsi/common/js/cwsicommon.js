var extraDivToHide = null;
var extraDivElementToFocus = null;


function initializePage() {
	hideAllDivs();
	var element = document.getElementById("SELECTLNET");
	if(element != null){

    		show("SELECTLNET");

	}else{
	   	show("SELECTLOGO");
	}

}

function initializeBase24Page(selectedRadioButton)
{
	viewClientIdLogoRadio(selectedRadioButton);
	var element = document.getElementById("SELECTLNET");
	if(element != null)
	{
    		viewFiIdDivT(document.getElementById("lnetSelect"));
	}

}

    function viewClientIdLogo(selectedRadioButton) {
   		hideAllDivs();
   		show(selectedRadioButton.value);
    }

    function viewClientIdLogoRadio(selectedRadioButton) {
	if(selectedRadioButton!=null){
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

    function viewFiId(selectedRadioButton) {
   		hideAllDivs();
   		show(selectedRadioButton.value);
    }

    function viewFiIdDiv(selectedListItem) {
	hideFIIDDIVS();
	if(selectedListItem != null){
   		show("FIID_"+selectedListItem.value);
	}
    }
    function viewFirstFiIdDiv(document) {
    	hideFIIDDIVS();
    	selectedListItem=document.getElementById("lnetSelect");
    	if(selectedListItem != null){
       		show("FIID_"+selectedListItem.value);
    	}
    }

    function viewFiIdRadio(selectedRadioButton) {

		for ( i=0;i<selectedRadioButton.length;i++)
		{
			if ( selectedRadioButton[i].checked)
			{
				viewClientIdLogo(selectedRadioButton[i]);
				return true;
			}
		}
    }


function viewFiIdSelect(selectedOption) {

	hideAllDivs();
	show(selectedOption.options[selectedOption.selectedIndex].value);
}

function hideAllDivs() {
	var element = document.getElementById("SELECTLNET");
	if(element != null){
		hide("SELECTLNET");
		hide("ENTERLNET");
		hide("SELECTCLIENTID");
		hide("ENTERCLIENTID");
	}

	element = document.getElementById("ENTERLNET");
	if(element != null){
			hide("ENTERLNET");
			hide("ENTERCLIENTID");
	}

	element = document.getElementById("SELECTLOGO");
	if(element != null){
		hide("SELECTLOGO");
		hide("SELECTCLIENTID");
		hide("ENTERLOGO");
		hide("ENTERCLIENTID");
	}

	if(extraDivToHide != null){
		hide(extraDivToHide);
	}

}
//
//The first argument is supposed to be the extra div label to hide. It is also the value of the client selection if the extra radio button was clicked.
//The second argument is supposed to be the name of the extra element to which focus is to be given.
function setExtraDivToHide(divToHide, elementToFocusID){

	//alert("extraDivToHide = " + extraDivToHide);
	extraDivToHide=divToHide;
	var elementToFocus = document.getElementById(elementToFocusID);
	if(elementToFocus!=null){
		extraDivElementToFocus=elementToFocus;
	}
}

function viewClientIdLogoSelect(selectedOption) {

	hideAllDivs();
	show(selectedOption.options[selectedOption.selectedIndex].value);
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

function openHelp(appName, pageHelp, system)
{
  alert("hi");
	//create a form object
	var form = document.createElement("Form");
	form.setAttribute('id',"helpform");
	form.setAttribute('action',"/apps/HelpViewer/helpviewer/view.action");
	form.setAttribute('method',"POST");
	
	var input_appName = document.createElement("input");
	input_appName.setAttribute('id',"appName");
	input_appName.setAttribute('name',"appName");
	input_appName.setAttribute('type',"hidden");
	input_appName.setAttribute('value',appName);
	form.appendChild(input_appName);

	if ( system != null )
	{
		//Add attribute system to the form only if it is not null.
		var input_system = document.createElement("input");
		input_system.setAttribute('id',"system");
		input_system.setAttribute('name',"system");
		input_system.setAttribute('type',"hidden");
		input_system.setAttribute('value',system);
		form.appendChild(input_system);
	}

	var input_pageHelp = document.createElement("input");
	input_pageHelp.setAttribute('id',"pageHelp");
	input_pageHelp.setAttribute('name',"pageHelp");
	input_pageHelp.setAttribute('type',"hidden");
	input_pageHelp.setAttribute('value',pageHelp);
	form.appendChild(input_pageHelp);
			
	document.body.appendChild(form);
				

	if ( system != null )
	{	
		if (window.name!="main")
		{
			if ( window.opener != null && window.opener.name != null && window.opener.name=="main" )
			{
				window.opener.OpenManagedAppWindow('', 'help'+appName, 'resizable=yes,scrollbars=no,menubar=no,toolbar=no,status=no,width=600,height=260,screenX=200,screenY=200,top=200,left=200', false);
				form.setAttribute('target','help'+appName);
				form.submit();
			}
			else if( pageHelp.indexOf("/cwsi/cwsi")==-1 && window.opener != null && window.opener.opener != null && window.opener.opener.name != null && window.opener.opener.name=="windowManager")
			{
				window.opener.opener.OpenManagedAppWindow('', 'help'+appName, 'resizable=yes,scrollbars=no,menubar=no,toolbar=no,status=no,width=600,height=260,screenX=200,screenY=200,top=200,left=200',false);
				form.setAttribute('target','help'+appName);
				form.submit();
			}
			else if(top !=null && top.windowManager !=null )
			{
				top.windowManager.OpenManagedAppWindow('', 'help'+appName, 'resizable=yes,scrollbars=no,menubar=no,toolbar=no,status=no,width=600,height=260,screenX=200,screenY=200,top=200,left=200',false);
				form.setAttribute('target','help'+appName);
				form.submit();
			}
		else {
			if ( pageHelp.indexOf("/cwsi/portal") == -1 && pageHelp.indexOf("/cwsi/cwsi") == -1 )
						pageHelp= "/cwsi"+pageHelp;
			
			    var winName ='help'+appName;
			    form.setAttribute('action',"/cwsi/apps/HelpViewer/helpviewer/view.action");
				var winApp = window.open('', winName, 'resizable=yes,scrollbars=no,menubar=no,toolbar=no,status=no,width=600,height=260,screenX=200,screenY=200,top=200,left=200');
				winApp.focus();
				input_pageHelp.setAttribute('value',pageHelp);
				form.setAttribute('target',winName);
				form.submit();
				}
		}
	else{
		parent.windowManager.OpenManagedAppWindow('', 'help'+appName, 'resizable=yes,scrollbars=no,menubar=no,toolbar=no,status=no,width=600,height=260,screenX=200,screenY=200,top=200,left=200',false);
		form.setAttribute('target','help'+appName);
		form.submit();
		}
	return false;
	}
	else
	{
		if (window.name!="main")
		{
			if ( window.opener != null && window.opener.name != null && window.opener.name=="windowManager" )
					window.opener.OpenManagedAppWindow('', 'help'+appName, 'resizable=yes,scrollbars=no,menubar=no,toolbar=no,status=no,width=600,height=260,screenX=200,screenY=200,top=200,left=200',false);
			else
				top.windowManager.OpenManagedAppWindow('', 'help'+appName, 'resizable=yes,scrollbars=no,menubar=no,toolbar=no,status=no,width=600,height=260,screenX=200,screenY=200,top=200,left=200',false);
		}
		else
			parent.windowManager.OpenManagedAppWindow('', 'help'+appName, 'resizable=yes,scrollbars=no,menubar=no,toolbar=no,status=no,width=600,height=260,screenX=200,screenY=200,top=200,left=200',false);

		form.setAttribute('target','help'+appName);
		form.submit();
		
		return false;

	}
}



function viewFiIdDivT(lnetSelectTableCell)
{
	var elements = lnetSelectTableCell.getElementsByTagName("select");
	hideFIIDDIVS();

	if(elements != null)
	{
   		show("FIID_"+elements[0].value);
	}
}

function hideFIIDDIVS()
{
	var lnetSelect = document.getElementById("lnetSelect");
	var elements = lnetSelect.getElementsByTagName("option");

	for ( i=0; i<elements.length; i++)
	{
		hide("FIID_"+elements[i].value);
	}
}

function initializeFocus()
{	
	if(document.forms[0].clientSelectionOption != null){
	for (i=0;i<document.forms[0].clientSelectionOption.length;i++) {
		if (document.forms[0].clientSelectionOption[i].checked) {
			if (document.forms[0].clientSelectionOption[i].value=='ENTERLNET') {
				document.forms[0].lnetEnter.focus();
			}
			if (document.forms[0].clientSelectionOption[i].value=='SELECTLNET') {
				document.forms[0].lnetSelect.focus();
			}
			if (document.forms[0].clientSelectionOption[i].value=='ENTERCLIENTID') {
				document.forms[0].clientIdEnter.focus();
			}
			if (document.forms[0].clientSelectionOption[i].value=='SELECTCLIENTID') {
				document.forms[0].clientIdSelect.focus();
			}
			if (document.forms[0].clientSelectionOption[i].value=='ENTERLOGO') {
				document.forms[0].logoEnter.focus();
			}
			if (document.forms[0].clientSelectionOption[i].value=='SELECTLOGO') {
				document.forms[0].logoSelect.focus();
			}
			if(extraDivToHide != null){
				if (document.forms[0].clientSelectionOption[i].value==extraDivToHide) {
					if(extraDivElementToFocus!=null){
						extraDivElementToFocus.focus();
					}
				}
			}
		}
	}
	}
}

function enterKeySubmit(buttonname)
{
	document.onkeydown=function(e){
		if(window.event.keyCode == 13)
		{
			document.getElementById(buttonname).focus();
		}
	}

}


function getXMLHttpObject(){
var xmlHttp;
try
  {
  // Firefox, Opera 8.0+, Safari
  xmlHttp=new XMLHttpRequest();
  }
catch (e)
  {
  // Internet Explorer
  try
    {
    xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
    }
  catch (e)
    {
    try
      {
      xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
      }
    catch (e)
      {
      alert("Your browser does not support AJAX!");
      return false;
      }
    }
  }
  return xmlHttp;
}


function eNoteAjaxCall(appData, xmlHttp, url)
{
	xmlHttp.onreadystatechange=function() {
  		if (xmlHttp.readyState==4) { 
         		secondAjaxCall(appData, getXMLHttpObject(),url);
	 	}	
	}	

	initializeENote(appData, xmlHttp,url);
}

function initializeENote(appData, xmlHttp,url){

	var param="appData="+appData;
	
	xmlHttp.open("POST",url,true);
	xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlHttp.setRequestHeader("Content-length", param.length);
	xmlHttp.setRequestHeader("Connection", "close");
	xmlHttp.send(param);

}

function secondAjaxCall(appData, xmlHttp,url)
{	
ResetTimeout();
  	xmlHttp.onreadystatechange=function()
	{
			  if(xmlHttp.readyState==4)
			  {
			  	  	if(xmlHttp.status==200){
				  		document.getElementById("notesdiv").innerHTML=xmlHttp.responseText;
				  		
						if(document.getElementById("enoteMessage")!=null){
								document.getElementById("seconday_template_message_div").innerHTML = document.getElementById("enoteMessage").innerHTML;
								document.getElementById("enoteMessage").innerHTML = '';
							}else if(document.getElementById("ajaxerrorsdiv")!=null){
								document.getElementById("seconday_template_message_div").innerHTML = document.getElementById("ajaxerrorsdiv").innerHTML;
								document.getElementById("ajaxerrorsdiv").innerHTML = '';
							}
				  	}else{
						document.getElementById("notesdiv").innerHTML='';
						document.getElementById("notesmsgdiv").innerHTML='';
						document.getElementById("seconday_template_message_div").innerHTML="<TABLE BORDER='0' CELLPADDING='0' CELLSPACING='0'><TR><TD><div id='errormessagetitleAjax'><TABLE BORDER='0' CELLPADDING='0' CELLSPACING='0'><TR><TD><img src='/common/images/dot.gif' height='5'></TD></TR><TR><TD><div class='errormessagetitle'>The following error(s) occurred:</div></TD></TR><TR><TD><img src='/common/images/dot.gif' height='3'></TD></TR><TR><TD></TABLE></div></TD></TR><TR><TD><TABLE BORDER='0' CELLPADDING='0' CELLSPACING='0'><TR><TD valign='TOP'>&nbsp;&nbsp;&nbsp;&nbsp;<img src='/common/images/diamond_red01 11x11.gif' >&nbsp;</TD><TD VALIGN='TOP'>	<div class='errormessage'>Error occurred while fetching Notes.</div></TD></TR></TABLE></TD></TR><TR><TD><img src='/common/images/dot.gif' height='5'></TD></TR></TABLE>";
					}

					var errorIndex = document.getElementById("template_message_div").innerHTML.indexOf("error(s)");

						if(errorIndex!="-1"){
								//error(s) present in standard CWSi message.
								//Remove error(s) header(If exists) from Ajax response.
							if(document.getElementById("errormessagetitleAjax")!=null){
								document.getElementById("errormessagetitleAjax").innerHTML='';
							}
						}

			  }
}


	var param = "appData="+appData;

	xmlHttp.open("POST",url,true);

	xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlHttp.setRequestHeader("Content-length", param.length);
	xmlHttp.setRequestHeader("Connection", "close");

	xmlHttp.send(param);

}


function addENoteFunction(appData, xmlHttp, url)
{	ResetTimeout();

  	xmlHttp.onreadystatechange=function()
	{
		  if(xmlHttp.readyState==4)
		  {
		  	if(xmlHttp.status==200){
				document.getElementById("notesdiv").innerHTML=xmlHttp.responseText;
				
				if(document.getElementById("enoteMessage")!=null){
					document.getElementById("seconday_template_message_div").innerHTML = document.getElementById("enoteMessage").innerHTML;
					document.getElementById("enoteMessage").innerHTML = ''; 
				}else if(document.getElementById("ajaxerrorsdiv")!=null){
					document.getElementById("seconday_template_message_div").innerHTML = document.getElementById("ajaxerrorsdiv").innerHTML;
					document.getElementById("ajaxerrorsdiv").innerHTML = ''; 
				}
				
				
		  	}else{
		  		document.getElementById("notesdiv").innerHTML='';
				document.getElementById("notesmsgdiv").innerHTML='';
			  	document.getElementById("seconday_template_message_div").innerHTML="<TABLE BORDER='0' CELLPADDING='0' CELLSPACING='0'><TR><TD><div id='errormessagetitleAjax'><TABLE BORDER='0' CELLPADDING='0' CELLSPACING='0'><TR><TD><img src='/common/images/dot.gif' height='5'></TD></TR><TR><TD><div class='errormessagetitle'>The following error(s) occurred:</div></TD></TR><TR><TD><img src='/common/images/dot.gif' height='3'></TD></TR><TR><TD></TABLE></div></TD></TR><TR><TD><TABLE BORDER='0' CELLPADDING='0' CELLSPACING='0'><TR><TD valign='TOP'>&nbsp;&nbsp;&nbsp;&nbsp;<img src='/common/images/diamond_red01 11x11.gif' >&nbsp;</TD><TD VALIGN='TOP'>	<div class='errormessage'>Error occurred while fetching Notes.</div></TD></TR></TABLE></TD></TR><TR><TD><img src='/common/images/dot.gif' height='5'></TD></TR></TABLE>";
				
		  	}


			var errorIndex = document.getElementById("template_message_div").innerHTML.indexOf("error(s)");
				if(errorIndex!="-1"){
				//error(s) present in standard CWSi message.
				//Remove error(s) header(If exists) from Ajax response.
					if(document.getElementById("errormessagetitleAjax")!=null){
						document.getElementById("errormessagetitleAjax").innerHTML='';
						}
					}
			 }
		}

	var comm=document.getElementById("notetext").value;

	var index = document.getElementById("status").selectedIndex;

	var status=document.getElementById("status").value;
	var param="appData="+appData;
	param = param+"&comments="+encodeURIComponent(comm);
	param = param+"&status="+encodeURIComponent(status);

	xmlHttp.open("POST",url,true);

	xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xmlHttp.setRequestHeader("Content-length", param.length);
	xmlHttp.setRequestHeader("Connection", "close");
	xmlHttp.send(param);

  }

