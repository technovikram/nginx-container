var appWindows = new Array();
var appLogoutUrls = new Array();
var showUnloadAlert = true;
var openwinlist = new Array();
var openwinOrgNamelist = new Array();
var appFavsList = new Array();
var timeoutFlag = false;

function OpenManagedAppWindow(url, winName, sizeWindow) {
	OpenManagedAppWindow(url, winName, sizeWindow, true);
}

function OpenManagedAppWindowAjax(url, winName, sizeWindow, logoutURL, parentWinName) {
	var alteredWinName = replaceSpecialCharacters(winName);
	if(logoutURL==undefined) {
		if(url.indexOf('/apps') >= 0) {
			if(url.indexOf('?') >= 0)
				appLogoutUrls[alteredWinName]=url.substring(0,url.lastIndexOf('/'))+"/logoutapp";
			else
				appLogoutUrls[alteredWinName]=url+"/logoutapp";
		}
	} else {
		if(logoutURL.indexOf('/apps') >= 0)	{
			appLogoutUrls[alteredWinName]=logoutURL.substring(0,logoutURL.lastIndexOf('/'))+"/logoutapp";
		} else
			appLogoutUrls[alteredWinName]=logoutURL;
	}
	OpenManagedAppWindow(url, winName, sizeWindow, false, parentWinName);
}

function logoutApps(logoutURL) {
	var xmlHttp=new XMLHttpRequest();
	var responseText;
	xmlHttp.onreadystatechange=function()
	{
	  if(xmlHttp.readyState==4)
	  {
		if(xmlHttp.status==200){
			responseText=xmlHttp.responseText;
		}
	  }
	}
	xmlHttp.open("POST",logoutURL,true);
	xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  	xmlHttp.send(null);
}

function OpenManagedAppWindow(url, winName, sizeWindow, reuseWindow, parentWinName) {
	var alteredWinName = replaceSpecialCharacters(winName);
	windowHandle = getWindow(alteredWinName);
	if ((windowHandle != null) && !(windowHandle.closed)) {
		if ( reuseWindow ) {
			windowHandle.focus();
			return;
		} else {
			windowHandle.close();
		}
	}
	var winOptions = "status,menubar,scrollbars,resizable";
	if (sizeWindow == "TRUE") {
		if (screen.width == 800) {
			myWidth  = screen.width-10;
			myHeight = screen.height-150;
			myLeft   = 0;
			myTop    = 0;
		} else {
			myWidth  = screen.width * 0.9;
			myHeight = (screen.height * 0.9) - 100;
			myLeft   = screen.width * 0.05;
			myTop    = screen.height * 0.04;
		}
		var winOptions = winOptions + ",width="+myWidth+",height="+myHeight+",left="+myLeft+",top="+myTop;
	} else {
		winOptions = sizeWindow;
	}
	var parentHandler = getWindow(parentWinName);
	var windowHandle;

	if(parentHandler!=null){	
		windowHandle = parentHandler.open(url, alteredWinName, winOptions);
	}else{
    	windowHandle = window.open(url, alteredWinName, winOptions);
	}
	addWindow(alteredWinName, windowHandle, winName);
}

function getWindow(winName) {
	return appWindows[winName];
}

function addWindow(alteredWinName, windowHandle, winName) {
	appWindows[alteredWinName] = windowHandle;
	if(!(winName != null && winName.indexOf("help")==0)){ 
		 openwinlist[alteredWinName] =  windowHandle; 
		 if(winName != null && winName == "CardManagement"){
			winName = "Card Management"
		 }
		 openwinOrgNamelist[alteredWinName] = winName;
		 refreshApp();
	 }
}

function cloneObject(source) {
    for (i in source) {
        if (typeof source[i] == 'source') {
            this[i] = new cloneObject(source[i]);
        }
        else{
            this[i] = source[i];
		}
    }
}
 
function refreshApp() {
	refreshQuickApp(openwinlist, openwinOrgNamelist);
}

function LogoutAppWindowAndApp() {
	if ( confirm("Are you sure you want to logout and close all applications?")) {
		for (x in appWindows) {
			appWindows[x].close();
			appWindows[x] = null;
			if(!(appLogoutUrls[x]==undefined))
				logoutApps(appLogoutUrls[x]);
			appLogoutUrls[x]=null;
		}
		showUnloadAlert=false;
		return true;
	} else
		return false;
}

function LogoutAppWindow() {
	if ( confirm("Are you sure you want to logout and close all applications?")) {
		for (x in appWindows) {
			appWindows[x].close();
			appWindows[x] = null;
			appLogoutUrls[x]=null;
		}
		showUnloadAlert=false;
		return true;
	}
	else
		return false;
}

function LogoutAppWindowUnload() {
	for (x in appWindows) {
		if ( appWindows[x] != null ) {
			appWindows[x].close();
			appWindows[x] = null;
		}
	}
}

function LogoutAppWindowBeforeUnload() {
	if ( showUnloadAlert && !timeoutFlag)
		window.event.returnValue = 'This will log you out of the ClientCentral Portal and close all applications.';
	if(timeoutFlag)
		alert('Your ClientCentral Portal session has timed out. You will need to log in again.');
	stopSessionPortal();	
}

function replaceSpecialCharacters(winName){
	winName = winName.replace(/ /g,"");
	winName = winName.replace(/&/g,"");	
	winName = winName.replace(/\(/g,"");
	winName = winName.replace(/\)/g,"");	
	winName = winName.replace(/\./g,"_");
	winName = winName.replace(/:/g,"");
	winName = winName.replace(/-/g,"");
	return winName;
}

function checkTimeoutActivity() {
	var xmlHttp=new XMLHttpRequest();
	var responseText;
	xmlHttp.onreadystatechange=function()
	{
	  if(xmlHttp.readyState==4) {
		if(xmlHttp.status==200){
			responseText=xmlHttp.responseText;
			if(responseText !='Y'){
				resetTimeoutFlag();
			 	top.location.reload(true);
			} else {
				keepAlivePortal();
			}
		}else{
			if(xmlHttp.status==0) {
				resetTimeoutFlag();
				top.location.reload(true);
			}
		}
	  }
	}
	xmlHttp.open("POST","/portal/logintest/logintest.html",false);
	xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	var ieversion=getBrowserVersion();
	var opversion=getOperatingSystemVersion();

	try{
		xmlHttp.send(null);
	} catch (e) {
    	resetTimeoutFlag();
		top.location.reload(true);
	}
}

function resetTimeoutFlag() {
    timeoutFlag = true;
}

function keepAlivePortal() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status != 200) {
				console.log("Error: " + xmlhttp.statusText);
			}
		}
	};
	 
	xmlhttp.open("POST", "/apps/Portal/fs", true);
	xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	var kaData = "command=keepalive";
	xmlhttp.send(kaData);
}

function stopSessionPortal() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status != 200) {
				console.log("Error: " + xmlhttp.statusText);
			}
		}
	};
	 
	xmlhttp.open("POST", "/apps/Portal/logout", true);
	xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	var ssData = "command=stop";
	xmlhttp.send(ssData);
}

function showPopup(name) {
	if(!openwinlist[name].closed) {
		openwinlist[name].focus();				
	}else {
		delete openwinlist[name];
		delete openwinOrgNamelist[name];
		refreshQuickApp(openwinlist, openwinOrgNamelist);	
	}
}

function refreshQuickApp(owList, owNamelist) {
	var windowarr = owList;
	var windowOrgNamearr = owNamelist;
	var str='';
	for (x in windowarr) {
		if (!windowarr[x].closed) {
			if (appFavsList[x] == null) {
				str+='<li onclick=showPopup("'+x+'") class="quick-access-body open-tab">';  
				str+=windowOrgNamearr[x];
				str+='</li>';
			}
		}else{
			delete windowarr[x];
			delete windowOrgNamearr[x];
		}                         
	}
	var ulOpen = document.createElement('ul');
	ulOpen.innerHTML = str;	
	refreshQuickAppFavorites(owList, owNamelist, ulOpen);
}

function refreshQuickAppFavorites(owList, owNamelist, ulOpen) {
	var windowarr = owList;
	var windowOrgNamearr = owNamelist;
	var str='';
	for (x in appFavsList) {
		var appFav = appFavsList[x];
		if (windowarr[x] == null) {
			str+='<li onclick="checkTimeoutActivity();OpenManagedNewAppWindowAjax(\'' + appFav[1] + '\',\'' + appFav[0] + '\',\'TRUE\',\'false\'); return false;" class="quick-access-body">';  
			str+=appFav[0];
			str+='<i class="material-icons quick-access-icon">&#xE83A;</i>';
			str+='</li>';
		}else{
			str+='<li onclick=showPopup("'+x+'") class="quick-access-body open-tab">';  
			str+=appFav[0];
			str+='<i class="material-icons quick-access-icon">&#xE838;</i>';
			str+='</li>';
		}                         
	}
	
	var ulFav = document.createElement('ul');
	ulFav.innerHTML = str;	
	
	var i = ulOpen.childNodes.length;
	while (i--) {
		var item = ulOpen.childNodes[i];
		if (item.nodeName == "LI") {
			var j=0;
			var upItem = item.innerHTML.toUpperCase();
			for (j=0; j < ulFav.childNodes.length; j++) {
				if (ulFav.childNodes[j].nodeName == "LI") {
					if (upItem < ulFav.childNodes[j].innerHTML.toUpperCase()) {
						ulFav.insertBefore(item, ulFav.childNodes[j]);
						break;
					}
				}
			}
			if (j == ulFav.childNodes.length) {
				ulFav.appendChild(item);
			}
		}
	}
	if (document.getElementById('quickappFavList') != null){
		document.getElementById('quickappFavList').innerHTML = ulFav.innerHTML;				
	}
}

setInterval("refreshApp();",5000);
