// Save the button action
var actionName;
var buttonAction;
var scrollTableNames = new Array();
function selectItemInList(listbox, selectedItem)
{
	for (var i=0;i<listbox.options.length;i++)
	{
		if ( listbox.options[i].value.indexOf(selectedItem) >= 0 )
		{
			listbox.selectedIndex = i;
			break;
		}
	}
}

function setAction(name, form)
{
      form.action.value= name;
}
function doCancel()
{
      form.org.apache.struts.taglib.html.CANCEL.value= "cancel";
}

//CR2652: Change for Base24 users.
function footerNewPopup(theURL,theWindowName,b24value){
	
	if(b24value=="true")
		theWindowName =theWindowName+"_B24";
	
	footerPopup(theURL,theWindowName);
}

function footerPopup(theURL,theWindowName) {
	var myWin=window.open('', theWindowName);
	myWin.location=theURL;
	myWin.focus();

}

function initializeFM(appData, xmlHttp,url){
	var paramfm="appData="+appData;
	xmlHttp.open("POST",url,false);
	xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlHttp.setRequestHeader("Content-length", paramfm.length);
	xmlHttp.setRequestHeader("Connection", "close");
	xmlHttp.send(paramfm);
}

function cnsprintarea()
{
	var argv = cnsprintarea.arguments;
	var argc = cnsprintarea.arguments.length;
	var title = (argc > 0) ? argv[0] : "";
	var total_cns_print="";

	if(document.getElementById("cnsprintheader")){
		if(document.getElementById("cnsprintblock")){
			total_cns_print+=cnsprintheader.innerHTML + cnsprintblock.innerHTML;
		}else{
			total_cns_print+=cnsprintheader.innerHTML;
		}

	}
	else if(document.getElementById("cnsprintblock")){
		total_cns_print+=cnsprintblock.innerHTML;
	}
	else{
		total_cns_print+="NO PRINT AREA FOUND";
	}
	newwin=window.open("/common/html/printpage.htm","winCNSPrt","menubar=0,resizable=0,width=1,height=1,left=200,top=200");
	newwin.document.open();
	newwin.moveTo(-200,-200);
	newwin.document.write("<html><head><title>" + title + "</title>");
	newwin.document.write("<link href='/common/css/main.css' rel='stylesheet' type='text/css'>");
	newwin.document.write("</head><body>");
	newwin.document.write(total_cns_print);

	if(newwin.document.getElementById("tblhead") != null){
		for ( var rowCount=0; rowCount<newwin.document.getElementById("tblhead").getElementsByTagName("TH").length; rowCount++ )
		{
			newwin.document.getElementById("tblhead").getElementsByTagName("TH")[rowCount].style.top = "-2";
		}
	}

	newwin.document.write("</body></html>");
	newwin.document.close();
	newwin.print();
	newwin.close();
}

function cnsprintsearch()
{
	var argv = cnsprintsearch.arguments;
	var argc = cnsprintsearch.arguments.length;
	var title = (argc > 0) ? argv[0] : "";
	newwin=window.open("/common/html/printpage.htm","winCNSPrt","menubar=0,resizable=0,width=1,height=1,left=200,top=200");
	newwin.document.open();
	newwin.moveTo(-200,-200);
	newwin.document.write("<html><head><title>" + title + "</title>");
	newwin.document.write("<link href='/common/css/main.css' rel='stylesheet' type='text/css'>");
	newwin.document.write("</head><body>");
    newwin.document.write(cnsprintkeyinfo.innerHTML);
    newwin.document.write("<br>");
    newwin.document.write(cnsprinttableheader.innerHTML);

	if(document.getElementById("cnsprintblock")){
	    newwin.document.write(cnsprintblock.innerHTML);
	}

	newwin.document.write("</body></html>");
	newwin.document.close();
	newwin.print();
	newwin.close();
}


function ChangeExpandState(id)
{

	if(document.getElementById(id).style.display=='none')
	{
		document.getElementById(id).style.display='block';
		document.getElementById('img'+id).src='/common/images/Collapse.gif';
		document.getElementById('img'+id).alt='Collapse All';
	}else{
		document.getElementById(id).style.display='none';
		document.getElementById('img'+id).src='/common/images/Expand.gif';
		document.getElementById('img'+id).alt='Expand All';
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

function getBrowserVersion()
{

	if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){ //test for MSIE x.x;
		var ieversion=new Number(RegExp.$1) // capture x.x portion and store as a number
		return ieversion;
	}


}

function getOperatingSystemVersion()
{


	if (/Windows NT (\d+\.\d+);/.test(navigator.userAgent)){ //test for Windows NT x.x;
		var opversion=RegExp.$1 // capture x.x portion and store as a number
		return opversion;
	}

}

//CR2652: Change for Base24 users.
function OpenManagedNewAppWindowAjax(url, winName, sizeWindow,b24value){
	
	if(b24value=="true")
		winName =winName+"_B24";
	
	OpenManagedAppWindowAjax(url, winName, sizeWindow);
}

function OpenManagedAppWindowAjax(url, winName, sizeWindow)
{
	// CR2652: Change for Base24 users.
	var hostURL = document.domain;
	if(hostURL.indexOf('24') != -1)
		winName =winName+"_B24";

	var xmlHttp=getXMLHttpObject();
	var responseText;

		xmlHttp.onreadystatechange=function()
		{
		  if(xmlHttp.readyState==4)
		  {
			if(xmlHttp.status==200){
				responseText=xmlHttp.responseText;
				if(responseText=='Y')
					OpenManagedAppWindow(url, winName, sizeWindow, top);
				else
				 	top.location.reload(true);

			}else{
				top.location.reload(true);

			}
		  }


		}


		xmlHttp.open("POST","/portal/logintest/logintest.html",true);
		xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		var ieversion=getBrowserVersion();
		var opversion=getOperatingSystemVersion();

		if(ieversion != '6' && (opversion != '5.0' || opversion != '5.01'))
		{
			xmlHttp.setRequestHeader("Connection", "close");
		}
		xmlHttp.send(null);


}



function OpenAppWindow(url, winName, sizeWindow)
{
	var winOptions = "width=1,heigth=1,left=9999,top=9999";
	var winTest = window.open("", winName, winOptions);

	if (winTest.top.screenLeft >= 9999)
	{
		winTest.close();
		winOptions = "toolbar,status,menubar,scrollbars,resizable";

		if (sizeWindow == "TRUE")
		{
			if (screen.width == 800)
			{
				myWidth  = screen.width-10;
		  		myHeight = screen.height-150;
				myLeft   = 0;
				myTop    = 0;
			}
			else
			{
				myWidth  = screen.width * 0.9;
		  		myHeight = (screen.height * 0.9) - 100;
				myLeft   = screen.width * 0.05;
				myTop    = screen.height * 0.04;
			}
			var winOptions = winOptions + ",width="+myWidth+",height="+myHeight+",left="+myLeft+",top="+myTop;
		}

		var winApp = window.open(url, winName, winOptions);
	}
	else
	{
		winTest.focus();
	}
}

function OpenManagedAppWindow(url, winName, sizeWindow, mainframeset)
{

	if ( mainframeset == null )
		mainframeset = parent;

	mainframeset.windowManager.OpenManagedAppWindowAjax(url, winName, sizeWindow);

}

function LogoutClientCentral(url)
{

	var xmlHttp=getXMLHttpObject();
		var responseText;

			xmlHttp.onreadystatechange=function()
			{
			  if(xmlHttp.readyState==4)
			  {
				if(xmlHttp.status==200){
					responseText=xmlHttp.responseText;
					if(responseText=='Y')
					{
						if(LogoutAppWindowAndApp())
							window.location.href=url;
						else
						  return false;
					}
					else{
						if(LogoutAppWindow())
							window.location.href="/AGLogout";
					 	 else
						  return false;
					 }

				}else{
					if(LogoutAppWindow())
						window.location.href="/AGLogout";
					else
					    return false;

				}
			  }


			}


		xmlHttp.open("POST","/portal/logintest/logintest.html",true);
		xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		var ieversion=getBrowserVersion();
		var opversion=getOperatingSystemVersion();

		if(ieversion != '6' && (opversion != '5.0' || opversion != '5.01'))
		{
			xmlHttp.setRequestHeader("Connection", "close");
		}
		xmlHttp.send();


}
function createCancel(form) {
		bCancel=true;
		var cancel = document.createElement('input');
		cancel.type = "hidden";
		cancel.name = "org.apache.struts.taglib.html.CANCEL";
		cancel.value = "";
		form.appendChild(cancel);


}

function show(elementId) {

	if (! document.getElementById) { // For the unlikely event that it's not supported
		return;
	}

	var element = document.getElementById(elementId);

	element.style.visibility = "visible";
	element.style.display = "block";
}

function hide(elementId) {
	if (! document.getElementById) { // For the unlikely event that it's not supported
		return;
	}
   
   if(document.getElementById(elementId)!=null){
	var element = document.getElementById(elementId);
	//alert("RequestedElem: "+elementId+" | ElementById: "+element);
	element.style.visibility = "hidden";
	element.style.display = "none";
   }
}

///////////////////////////////////////////////////////////////////////
// Bypass disable if undefined.
///////////////////////////////////////////////////////////////////////
function findElementByNameValueDisable(name,val)
{
	var test = findElementByNameValue(name,val)

	if (typeof test != 'undefined') {
		test.disable=true;
	}
}

function findElementByNameValue(name,val)
{
	var aButtons = document.getElementsByName(name);
	for (i=0; i<aButtons.length; i++)
	{
		if (aButtons[i].value == val) return aButtons[i];
	}
}

function hiddenformfield(name, value, form) {

		var field = document.createElement('input');
		field.type = "hidden";
		field.name = name;
		field.value = value;
		form.appendChild(field);

}

///////////////////////////////////////////////////////////////////////
// set field to upper case
///////////////////////////////////////////////////////////////////////
function toUpperFormTextField(selectedField)
{
	if ( selectedField != null && (typeof(selectedField) != "undefined") && selectedField.value != null )
	{
		selectedField.value=selectedField.value.toUpperCase();
	}
}


// Date Time Formater

function formatDateField(date, required){

	tmp=date.value;
	var onlyDigits=true;

	if(tmp.length==6 || tmp.length==8){
		for(i=0;i<tmp.length;i++){
			if(tmp.charAt(i) < '0' || tmp.charAt(i) > '9'){
				onlyDigits=false;
			}
		}
		if(onlyDigits){
			tmp=tmp.substring(0,2)+"/"+tmp.substr(2,2)+"/"+tmp.substr(4,tmp.length);
		}
	}

	// Validate that Month/day are two characters and year is 4.
	tmp=completeDateWithSlashMMDDYYYY(tmp);


	if( isDate(tmp,'MM/dd/yy')  || isDate(tmp,'MM/dd/yyyy') ) {
		var d=parseDate(tmp);
		if (d != null){
			date.value=formatDate(d,'MM/dd/yyyy');
		}
	}


	return true;

}

///////////////////////////////////////////////////////////////////////
// Make the month and day 2 characters and the year 4.
// If the year is less then 4 characters 2 is placed in the first
// position of the year.
///////////////////////////////////////////////////////////////////////
function completeDateWithSlashMMDDYYYY(inDate)
{
	var tmp = "";
	var start=0;
	var slash=inDate.indexOf("/",start);
	var yearLength=0;
	var yearPlug="";

	if (slash > 0)
	{
		// Month and Day
		while(slash > 0 ) {
			if ( (slash - start) < 2 )
			{
				tmp=tmp+"0";
			}
			// +1 to include slash
			tmp= tmp+inDate.substring(start,slash+1);

			start=slash+1;
			slash=inDate.indexOf("/",start);
		 }

		 // year
		 yearLength=inDate.length - start;
		 if (yearLength==3)	yearPlug="2";
		 if (yearLength==2)	yearPlug="20";
		 if (yearLength==1)	yearPlug="200";

		 tmp= tmp + yearPlug + inDate.substring(start);
	}

	return tmp;
}

// Date Format for MM/dd

function formatDateMMDDField(date, required)
{

	tmp=date.value;

	if(tmp.indexOf("/") == -1) {
		var onlyDigits=true;

		if(tmp.length==3 || tmp.length==4){
			for(i=0;i<tmp.length;i++){
				if(tmp.charAt(i) < '0' || tmp.charAt(i) > '9'){
					onlyDigits=false;
				}
			}
			if(onlyDigits){
				if(tmp.length==3){
				    tmp = "0" + tmp
				}
				tmp=tmp.substring(0,2)+"/"+tmp.substr(2,2);
			}
		}
	}

	if( isDate(tmp,'MM/dd') || isDate(tmp,'M/dd') || isDate(tmp,'MM/d') || isDate(tmp,'M/d')) {
		var d=parseDate(tmp);
		if (d != null){
			date.value=formatDate(d,'MM/dd');
		}
	}


	return true;
}

function formatBirthDateField(date, required){

	tmp=date.value;
	var onlyDigits=true;

	if(tmp.length==6 || tmp.length==8){
		for(i=0;i<tmp.length;i++){
			if(tmp.charAt(i) < '0' || tmp.charAt(i) > '9'){
				onlyDigits=false;
			}
		}
		if(onlyDigits){
			tmp=tmp.substring(0,2)+"/"+tmp.substr(2,2)+"/"+tmp.substr(4,tmp.length);
		}
	}


	if( isDate(tmp,'MM/dd/yy')  || isDate(tmp,'MM/dd/yyyy') ) {
		var d=parseBirthDate(tmp);
			if (d != null){
				date.value=formatDate(d,'MM/dd/yyyy');
			}
	}

	return true;

}


// Date Format for MM/YY

function formatDateMMYYField(date, required) {

	tmp=date.value;
	if(tmp.indexOf("/") == -1) {
		var onlyDigits=true;

		if(tmp.length==3 || tmp.length==4){

			for(i=0;i<tmp.length;i++){
				if(tmp.charAt(i) < '0' || tmp.charAt(i) > '9'){
					onlyDigits=false;
				}
			}

			if(onlyDigits){
				if(tmp.length==3){
				    tmp = "0" + tmp
				}
				var mm = tmp.substring(0,2);
				var yy = tmp.substr(2)
				tmp=mm+ "/" +yy;
				date.value = tmp;
			}
		}
	} else {
		if((tmp.length==4) && (isDate(tmp,'M/yy'))) {
			date.value="0" + tmp;
		}
	}

	return true;
}

function formatTimeHHMMField(time) {


	tmp=time.value;

	if(tmp.indexOf(":") == -1) {
		var onlyDigits=true;

		for(i=0;i<tmp.length;i++){
			if(tmp.charAt(i) < '0' || tmp.charAt(i) > '9'){
				onlyDigits=false;
			}
		}

		if(onlyDigits){

			if(tmp.valueOf() == 0){
				tmp="00:00";
				time.value = tmp;
			}
			else
			{
				if(tmp.length==4){

					if(onlyDigits){
						var hh = tmp.substring(0,2);
						var mm = tmp.substr(2)
						tmp=hh+ ":" +mm;
						time.value = tmp;

					}
				}
			}
		}
	}
	return true;
}

function formatTimeField(time){

	tmp=time.value;
	len=time.value.length;

	if(tmp.indexOf(":") == -1) {
		if(len==4){
			tmp=tmp.substr(0,2)+":"+tmp.substr(2,2)
		}
		if(len==5){
			tmp="0"+tmp;
			tmp=tmp.substr(0,2)+":"+tmp.substr(2,2)+":"+tmp.substr(4,2)
		}
		if(len==6){
			tmp=tmp.substr(0,2)+":"+tmp.substr(2,2)+":"+tmp.substr(4,2)
		}
		if(len==7){
			tmp="0"+tmp;
		}
	}
	time.value=tmp
	return true;

}

// Mask Formatter.
// Known Problem: Cannot be used if the specified format is not for a field with fixed length values.
// E.g a float field such as amount may have maxlength 6 and format ####.##. A value such as 23.45 will be problematic. It will get formatted as 2345 on keyup.

function formatField(objField, strFormat)
{
	if(document.all)
	{
		if(event.keyCode == 46 | event.keyCode == 8) return
		if(document.selection.createRange().offsetLeft < objField.createTextRange().boundingWidth) return
	}
	for( i = 0 ; i < strFormat.length ; i++)
	{
		if(strFormat.charAt(i) == "#") //the current character must be a digit
		{
			if(objField.value.length > i )
			{
				if(isNaN(objField.value.charAt(i)) || objField.value.charAt(i) == " ") //if its not a number, it's erased and the loop is set back one
				{
					objField.value = objField.value.substring(0,i) + objField.value.substring(i + 1,objField.value.length)
					i--
				}
			}
		}
		else if(strFormat.charAt(i) == "a") //the current character must be a letter (case insensitive)
		{
			if(objField.value.length > i )
			{
				//if its not a letter, it's erased
				if(objField.value.charAt(i).toUpperCase() < "A" || objField.value.charAt(i).toUpperCase() > "Z" )
				{
					objField.value = objField.value.substring(0,i) + objField.value.substring(i + 1,objField.value.length)
					i--
				}
			}
		}
		else if(strFormat.charAt(i) == "A") //the current character must be an uppercase letter
		{
			if(objField.value.length > i )
			{
				//if its not a letter, it's removed
				if(objField.value.charAt(i).toUpperCase() < "A" || objField.value.charAt(i).toUpperCase() > "Z" )
				{
					objField.value = objField.value.substring(0,i) + objField.value.substring(i + 1,objField.value.length)
					i--
				}
				else //otherwise, it is set to uppercase
				{
					objField.value = objField.value.substring(0,i) + objField.value.charAt(i).toUpperCase() + objField.value.substring(i + 1,objField.value.length)
				}
			}
		}
		else //the current character must be the same as the one in the format string
		{
			if(objField.value.length > i )
			{
				//if it isn't already the correct character, insert the character
				if(objField.value.charAt(i) != strFormat.charAt(i))
				{
					objField.value = objField.value.substring(0,i) + strFormat.charAt(i) + objField.value.substring(i,objField.value.length)
				}
			}
		}
	}
	if(objField.value.length > strFormat.length)
	{
		objField.value = objField.value.substring(0,strFormat.length)
	}
}

function setScrollableTableSelection(num, hiddenVarName)
{
	//this has been retained to support webuiutil code tagged 1.0.5
	if(document.getElementById("tblResults")!=null)
	{
		tblID	=	document.getElementById("tblResults");
	}else
	{
		scrlblTblName = hiddenVarName.substring(0, hiddenVarName.length-14);
		tblID	=	document.getElementById(scrlblTblName+"_tblResults");
	}


	theEle=document.getElementById(hiddenVarName);
		currentRow = theEle.value;

		tblID.tBodies[0].rows[num].className='rowhover';
		if ( currentRow != num )
		{


			if (currentRow%2)
			{
			   tblID.tBodies[0].rows[currentRow].className='highlightTableRowBlue';
			}
			else
			{
			   tblID.tBodies[0].rows[currentRow].className='normal';
			}
		}
		theEle=document.getElementById(hiddenVarName);
	theEle.value=num;

}
function setScrollableTableSelectionWithSort(num, hiddenVarName)
{
   	num=num+1;
	var selIndex="";


	//this has been retained to support webuiutil code tagged 1.0.5
	if(document.getElementById("tblResults")!=null)
	{
		tblID	=	document.getElementById("tblResults");
	}else
	{
		scrlblTblName = hiddenVarName.substring(0, hiddenVarName.length-14);
		tblID	=	document.getElementById(scrlblTblName+"_tblResults");
	}


	for ( var rowCount=0; rowCount<tblID.tBodies[0].rows.length; rowCount++ )
	{
		if ( tblID.tBodies[0].rows[rowCount].rowIndex == num)
		{
		  tblID.tBodies[0].rows[rowCount].className='rowhover';
		  selIndex = tblID.tBodies[0].rows[rowCount].cells[0].innerHTML;
		  scroll(num-2);

		}
		else
		{
			if (rowCount%2)
			{
				tblID.tBodies[0].rows[rowCount].className='highlightTableRowBlue';
			}
			else
			{
				tblID.tBodies[0].rows[rowCount].className='normal';
			}
		}
	}



	theEle=document.getElementById(hiddenVarName);

	theEle.value=parseSelectedIndex(selIndex);
}

function parseSelectedIndex(text)
{
	//var pattern1 = /<DIV id=dt\d+-\d+-\d+>/;
	//var pattern2 = /<\/DIV>/;
	//var replacedText;

	//temp = text.replace(pattern1,"");
	//replacedText = temp .replace(pattern2,"");
	//Modification to run in MOZILLA FIERFOX 1.5 and IE 6.0 onwards both
	var replacedText = text.substring(text.indexOf(">")+1,text.lastIndexOf("<"));

	return replacedText;
}
function resetScrollableTableSelectionWithSort( hiddenVarName)
{
	//this has been retained to support webuiutil code tagged 1.0.5
	if(document.getElementById("tblResults")!=null)
	{
		tblID	=	document.getElementById("tblResults");
	}else
	{
		scrlblTblName = hiddenVarName.substring(0, hiddenVarName.length-14);
		tblID	=	document.getElementById(scrlblTblName+"_tblResults");
	}
	TheEle = document.getElementById(hiddenVarName);
	for ( var rowCount=0; rowCount<tblID.tBodies[0].rows.length; rowCount++ )
	{
		if (TheEle.value == parseSelectedIndex(tblID.tBodies[0].rows[rowCount].cells[0].innerHTML) )
		{
			foundIndex = rowCount;
			scrollTo(foundIndex-1);
			break;
		}
	}
	setScrollableTableSelectionWithSort(foundIndex,hiddenVarName);
}

function checkKeyCallOnBlur(oEvent, obj) {
        var oEvent = (oEvent)? oEvent : event;
		if(oEvent.keyCode == 13){
	        obj.onblur();
        }
}

///////////////////////////////////////////////////////////////////////
// Disable the all the elements with a specific name.
///////////////////////////////////////////////////////////////////////
function disableElementByName(name)
{
	// Do not disable all the buttons if there is no button action saved.
	if (buttonAction == "" || buttonAction == null || buttonAction == undefined )
	{
		return;
	}

	var anElement = document.getElementsByName(name);
	for (i=0; i<anElement.length; i++)
	{
		anElement[i].disabled=true;
	}
}

///////////////////////////////////////////////////////////////////////
// Enable the all the elements with a specific name.
///////////////////////////////////////////////////////////////////////
function enableElementByName(name)
{
	var anElement = document.getElementsByName(name);
	for (i=0; i<anElement.length; i++)
	{
		anElement[i].disabled=false;
	}
}


///////////////////////////////////////////////////////////////////////
// Submit the action.  Call hiddenformfield using the action submitted
///////////////////////////////////////////////////////////////////////
function submitIt(form) {
	if (buttonAction != "" && buttonAction != null && buttonAction != undefined )
	{
		hiddenformfield("action",buttonAction,form);
	}
}

///////////////////////////////////////////////////////////////////////
// Save the action
///////////////////////////////////////////////////////////////////////
function saveAction(form) {
	buttonAction=form.value;
}

///////////////////////////////////////////////////////////////////////
// Initialize the button action
///////////////////////////////////////////////////////////////////////
function initAction() {
	buttonAction="";
}

function scroll(id){
	if(id != "")
	{
		if(! scrollTableNames.length)
		{
			var html_body = document.getElementsByTagName('body').item(0);
			html_body.onload = scrollHere;
		}
		scrollTableNames[scrollTableNames.length] = id;
	}
}

function scrollHere(){

	for(var i=0;i<scrollTableNames.length;i++)
	{
		scrollTo(scrollTableNames[i]);
	}
	//scrollWindow();
}
function scrollTo(id){
	if (id < 0 )
	{
		id="tblhead";
	}


	if(document.getElementById(id) != null)
	{
		document.getElementById(id).scrollIntoView(true);
	}
}

function scrollWindow()
{
	if(parent != null)
				parent.scrollTo(0,0);
			else
				self.scrollTo(0,0);

}
///////////////////////////////////////////////////////////////////////
// Set input field identified by elementId as readonly and change its
// style to that styleClass
///////////////////////////////////////////////////////////////////////
function fieldReadOnly(elementId, styleClass) {
	if (! document.getElementById) { // For the unlikely event that it's not supported
		return;
	}
	var element = document.getElementById(elementId);
	if(element){
	element.setAttribute("readOnly", "true");
	element.setAttribute("tabIndex", "-1");

	if(styleClass!=null){
		element.className=styleClass;
	}
	}
}
///////////////////////////////////////////////////////////////////////
// Set input field identified by elementId as editable and change its
// style to that styleClass
///////////////////////////////////////////////////////////////////////
function fieldEditable(elementId, styleClass) {
	if (! document.getElementById) { // For the unlikely event that it's not supported
		return;
	}

 	var element = document.getElementById(elementId);

	element.removeAttribute("readOnly");
   	element.removeAttribute("tabIndex");

	if(styleClass!=null){
 		element.className=styleClass;
	}
}

// sort function - ascending (case-insensitive)
function sortFuncAsc(record1, record2) {
	var value1 = record1.optText.toLowerCase();
	var value2 = record2.optText.toLowerCase();
	if (value1 > value2) return(1);
	if (value1 < value2) return(-1);
	return(0);
}

// sort function - descending (case-insensitive)
function sortFuncDesc(record1, record2) {
	var value1 = record1.optText.toLowerCase();
	var value2 = record2.optText.toLowerCase();
	if (value1 > value2) return(-1);
	if (value1 < value2) return(1);
	return(0);
}

function sortSelect(selectToSort, ascendingOrder) {
	if (arguments.length == 1) ascendingOrder = true;    // default to ascending sort

	// copy options into an array
	var myOptions = [];
	for (var loop=0; loop<selectToSort.options.length; loop++) {
		 myOptions[loop] = { optText:selectToSort.options[loop].text, optValue:selectToSort.options[loop].value };
	}

	// sort array
	if (ascendingOrder) {
		 myOptions.sort(sortFuncAsc);
	} else {
		 myOptions.sort(sortFuncDesc);
	}

	// copy sorted options from array back to select box
	selectToSort.options.length = 0;
	for (var loop=0; loop<myOptions.length; loop++) {
		 var optObj = document.createElement('option');
		 optObj.text = myOptions[loop].optText;
		 optObj.value = myOptions[loop].optValue;
		 selectToSort.options.add(optObj);
	}
}

////////////////////////////////////////////////////////////////
// Formats the date time string as per the format specified
// in the parameter and left pads with zeros to match the
// format string.  It expects the same number of separators
// in the input string and format string.
//
// objThis        - the value
// objFormat      - contains the format String
// fieldSeparator - contains the separating character format.
//                  should be the same as what is used in the
//                  objFormat.
//
// Example:
// objThis	objFormat	fieldSeperator	returns
// 0/0		"mm/dd"		"/"				"00/00"
// 00		"mm/dd"		"/"				"00"
// /		"mm/dd"		"/"				"00/00"
// 1:12:6   "hh:mm:ss"	":"				"01:12:06"
////////////////////////////////////////////////////////////////
function fmtDateTime(objThis, objFormat, fieldSeperator) {
	if(objThis.length != 0){
		var dateArray = new Array();
		var fmtArray = new Array();
		var requiredPadLength = 0;

		dateArray = objThis.value.split(fieldSeperator);
		fmtArray = objFormat.split(fieldSeperator);

		if(dateArray.length == fmtArray.length){
			for (var iCount  =0; iCount <fmtArray.length; iCount++) {
			    dateArray[iCount] = trim(dateArray[iCount]);

				if (dateArray[iCount].length < fmtArray[iCount].length) {
				requiredPadLength = fmtArray[iCount].length-dateArray[iCount].length;
 					for(var i =0; i < requiredPadLength; i++){
 						dateArray[iCount] ="0"+dateArray[iCount];
 					}
 				}
 			}
 		}

 		objThis.value="";
 		for (var jCount  =0; jCount <dateArray.length;jCount++) {
			if (jCount!=0) {
				objThis.value += fieldSeperator;
			}
				objThis.value += dateArray[jCount];
		}
	}
}

////////////////////////////////////////////////////////////////
// Removes the leading and trailing spaces from the string.
////////////////////////////////////////////////////////////////
function trim(objThis){
	  return objThis.replace(/^\s*/, "").replace(/\s*$/, "");
}
////////////////////////////////////////////////////////////////
// Resize the iframe to the scrolling height.
////////////////////////////////////////////////////////////////
function resizeFrame(frameID) {

	var iframeObj = document.getElementById(frameID);

	if (iframeObj != null) {
		var iframeHeight  = iframeObj.height;

		var scrollingHeight =iframeObj.contentWindow.document.body.scrollHeight;


		//Resize the iframe to the scrolling height, if scrolling comes
		if (scrollingHeight  > iframeHeight  )
		{
		  iframeObj.style.height = scrollingHeight +'px';
		}
	}

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


//////////////////////////////////////////////////////////////
// Disable all links and buttons on ciick of a button.//
//////////////////////////////////////////////////////////////
	function onClickSaveAction(form) {
		buttonAction=form.value;
		actionName=form.name;
	}

	function submitAction(form) {
		if (buttonAction != "" && buttonAction != null && buttonAction != undefined )
		{
			addhiddenformfield(actionName, buttonAction, form);
		}
	}

	function addhiddenformfield(actionName, buttonAction, form) {
		var field = document.createElement('input');
		field.type = "hidden";
		field.name = actionName;
		field.value = buttonAction;
		form.appendChild(field);

	}

	function disableButtons(){
		var node_list = document.getElementsByTagName('input');

		for (var i = 0; i < node_list.length; i++) {
			var node = node_list[i];

			if (node.getAttribute('type') == 'submit') {
				node.disabled=true;
			}
		}
	}


function cnsprintselectedarea()
{

var str= new String();
var n = 1;

	while(document.getElementById("cnsprintblock"+n) != null)
	{
	    str =str+document.getElementById("cnsprintblock"+n).innerHTML +"<br>";
	    n++;
	}


 newwin=window.open("/common/html/printpage.htm","winCNSPrt","menubar=0,resizable=0,width=1,height=1,left=200,top=200");
 newwin.moveTo(-200,-200);

 newwin.document.write("<html><head>");
 newwin.document.write("<link href='/common/css/main.css' rel='stylesheet' type='text/css'>");
 newwin.document.write("</head><body>");

 str = str.replace(/OVERFLOW-Y: scroll;/g, "");
 newwin.document.write(str);
 newwin.document.write("</body></html>");
 newwin.document.close();
 newwin.print();
 newwin.close();
}
///////////////////////////////////////////////////////////////////////////////
// This method converts special character in all the fields on form to ////////
// prinatable character without convertOtherCharacters method call.  //////////
///////////////////////////////////////////////////////////////////////////////
function convertSpecialCharactersEnote(){

 var inputArray = document.getElementsByTagName("input");
 var textAreaArray = document.getElementsByTagName("textarea");
 //For Text Field.
  for (var index = 0; index < inputArray.length; index++)
  {
	  if(inputArray[index].type == 'text'  && inputArray[index].disabled == false)
	  {
		// convert the special characters
		inputArray[index].value = convertNonAsciiSpecialCharacters(inputArray[index].value);	
	   }
   }
   //For TextArea.
   for (var index = 0; index < textAreaArray.length; index++)
  {
	  if( textAreaArray[index].disabled == false)
	  {
		// convert the special characters
		textAreaArray[index].value = convertNonAsciiSpecialCharacters(textAreaArray[index].value);	
	   }
   }

}
///////////////////////////////////////////////////////////////////////////////
// This method converts special character in all the fields on form to ////////
// prinatable character.  /////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function convertSpecialCharacters(){

 var inputArray = document.getElementsByTagName("input");
 var textAreaArray = document.getElementsByTagName("textarea");
 var s="";
 //For Text Field.
  for (var index = 0; index < inputArray.length; index++)
  {
	  if(inputArray[index].type == 'text'  && inputArray[index].disabled == false)
	  {
		// convert the special characters
		s = convertNonAsciiSpecialCharacters(inputArray[index].value);
		inputArray[index].value = convertOtherCharacters(s);
	   }
   }

   //For TextArea.
   for (var index = 0; index < textAreaArray.length; index++)
  {
	  if( textAreaArray[index].disabled == false)
	  {
		// convert the special characters
		s = convertNonAsciiSpecialCharacters(textAreaArray[index].value);
		textAreaArray[index].value =convertOtherCharacters(s);
	   }
   }

}

///////////////////////////////////////////////////////////////////////////////
// This method will replace new line, carriage return, and tab with a space. //
///////////////////////////////////////////////////////////////////////////////

function convertOtherCharacters(fieldValue){

 var s = fieldValue;
 s = s.replace(/\n/g," ");
 s = s.replace(/\r/g," ");
 s = s.replace(/\t/g," ");

 return s;
}

///////////////////////////////////////////////////////////////////////////////
//This method replaces non ASCII characters with their ASCII representatives.//
///////////////////////////////////////////////////////////////////////////////
function convertNonAsciiSpecialCharacters(fieldValue){

var s = fieldValue;

 s = s.replace( /\u2018|\u2019|\u201A|\uFFFD/g, "'" );
 s = s.replace( /\u201c|\u201d|\u201e/g, '"' );
 s = s.replace( /\u02C6/g, '^' );
 s = s.replace( /\u2039/g, '<' );
 s = s.replace( /\u203A/g, '>' );
 s = s.replace( /\u2013/g, '-' );
 s = s.replace( /\u2014/g, '--' );
 s = s.replace( /\u2026/g, '...' );
 s = s.replace( /\u00A9/g, '(c)' );
 s = s.replace( /\u00AE/g, '(r)' );
 s = s.replace( /\u2122/g, 'TM' );
 s = s.replace( /\u00BC/g, '1/4' );
 s = s.replace( /\u00BD/g, '1/2' );
 s = s.replace( /\u00BE/g, '3/4' );
 s = s.replace( /\u02DC/g, " " );
 s = s.replace( /\u00A0/g, " ");

 return s;
}

// This method converts special character in all the fields on form to ////////
// printable character. This is generic method.////////////////////////////////
function convertSpecialCharactersFromAllInputFields(tabToSpace, lineBreakToSpace){

 var inputArray = document.getElementsByTagName("input");
 var textAreaArray = document.getElementsByTagName("textarea");
 //For Text Field.
  for (var index = 0; index < inputArray.length; index++)
  {
	  if(inputArray[index].type == 'text'  && inputArray[index].disabled == false)
	  {
		// convert the special characters
		inputArray[index].value = replaceSpecialCharactersConditionally(inputArray[index].value, tabToSpace, lineBreakToSpace)
	   }
   }
   //For TextArea.
   for (var index = 0; index < textAreaArray.length; index++)
  {
	  if( textAreaArray[index].disabled == false)
	  {
		// convert the special characters
		textAreaArray[index].value = replaceSpecialCharactersConditionally(textAreaArray[index].value, tabToSpace, lineBreakToSpace)
	   }
   }
}

// Helper method called from convertSpecialCharactersFromAllInputFields method only,
// to replace field values conditionally.
function replaceSpecialCharactersConditionally(fieldValue, tabToSpace, lineBreakToSpace){

	fieldValue = convertNonAsciiSpecialCharacters(fieldValue);
	
	if(tabToSpace== "true"){
 		fieldValue = fieldValue.replace(/\t/g," ");
	}
	if(lineBreakToSpace== "true"){
		fieldValue = fieldValue.replace(/\n/g," ");
 		fieldValue = fieldValue.replace(/\r/g," ");
	}
	return fieldValue;
}


if(document.getElementById("antiClickjack")==null)
{
	var css = 'body{display:none !important;}',
	head = document.head || document.getElementsByTagName('head')[0],
	style = document.createElement('style');
	style.id = "antiClickjack";
	style.type = 'text/css';
	if (style.styleSheet){
		style.styleSheet.cssText = css;
} else {
		style.appendChild(document.createTextNode(css));
}
	head.appendChild(style);
}

if(self===top){
           var anticlick = document.getElementById("antiClickjack");
           anticlick.parentNode.removeChild(anticlick);
}else{
	var siteadd=new String(document.location).split("/")[2];
    var framadd=null;
    try {
            framadd=new String(parent.parent.location).split("/")[2];
       } catch (e) {
           if (e.description.toLowerCase().indexOf('permission denied') == -1) {
        	   throw e;
           } 
       }
    if(siteadd==framadd){
                   var anticlick = document.getElementById("antiClickjack");
                   anticlick.parentNode.removeChild(anticlick);
                   
    }
}

