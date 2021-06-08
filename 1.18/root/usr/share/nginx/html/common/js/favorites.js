const FAV_MAX = 10;

function moveSelApps(srcList, tgtList) {
	var i = srcList.options.length;
	while (i--) {
		if (srcList.options[i].selected) {
			var app = srcList.options[i];
			positionAppInList(tgtList, app);
			app.selected = false;
		}
	}
}

function moveAllApps(srcList, tgtList) {
	var i = srcList.options.length;
	while (i--) {
		positionAppInList(tgtList, srcList.options[i]);
	}
}


function positionAppInList(tgtList, app) {
	var j = 0;
	var upApp = app.innerHTML.toUpperCase();
	for (j = 0; j < tgtList.options.length; j++) {
		if (upApp < tgtList.options[j].innerHTML.toUpperCase()) {
			tgtList.insertBefore(app, tgtList.options[j]);
			break;
		}
	}
	if (j == tgtList.options.length) {
		tgtList.appendChild(app);
	}
}


function resetFavorites() {
	var allApps = document.getElementById('allApplications');
	var favApps = document.getElementById('favApplications');
	
	if (favApps.options.length > 0) {
		if (Object.keys(appFavsList).length > 0) {
			var i = favApps.options.length;
			while (i--) {
				var appFound = false;
				for (x in appFavsList) {
					var appFav = appFavsList[x];
					if (appFav[2] == favApps.options[i].value) {
						appFound = true;
						break;
					}
				}
				if (!appFound) {
					positionAppInList(allApps, favApps.options[i]);
				}
			}
			for (x in appFavsList) {
				if  (Object.keys(appFavsList).length == favApps.options.length) {
					break;
				}
				var appFav = appFavsList[x];
				var appFound = false;
				for (var k = 0; k < favApps.options.length; k++) {
					if (appFav[2] == favApps.options[k].value) {
						appFound = true;
						break;
					}
				}
				if (!appFound) {
					for (var j = 0; j < allApps.options.length; j++) {
						if (appFav[2] == allApps.options[j].value) {
							positionAppInList(favApps, allApps.options[j]);
							break;
						}
					}
				}
			}
		} else {
			moveAllApps(favApps, allApps);
		}
	} else {
		if (Object.keys(appFavsList).length > 0) {
			for (x in appFavsList) {
				var appFav = appFavsList[x];
				for (var j = 0; j < allApps.options.length; j++) {
					if (appFav[2] == allApps.options[j].value) {
						positionAppInList(favApps, allApps.options[j]);
						break;
					}
				}
			}
		}
	}
}

function refreshFavoritesArray(favdata) {
	appFavsList = new Array();
    for (var i=0; i < favdata.length; i++) {
    	appFavsList[replaceSpecialCharacters(favdata[i].node_name)] = new Array(favdata[i].node_name, favdata[i].launch_url, favdata[i].node_id);
    }
    refreshApp();
}

function updateFavorites() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
				var data = "";
				try {
					data = JSON.parse(xmlhttp.responseText);
				} catch(err) {
					alert(err.message + " in " + xmlhttp.responseText);
					return;
				}
				refreshFavoritesArray(data);
			} else {
				alert("Error: " + xmlhttp.statusText);
			}
		}
	};
	 
	xmlhttp.open("POST", "/apps/Portal/fs", true);
	xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	var favData = "command=update&favorites=";
	var favApps = document.getElementById('favApplications');
	for (var j = 0; j < favApps.options.length; j++) {
		if (j > 0) {
			favData += ",";
		}
		favData += favApps.options[j].value;
	}
	xmlhttp.send(favData);
}

function refreshFavorites() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
				var data = "";
				try {
					data = JSON.parse(xmlhttp.responseText);
				} catch(err) {
					alert(err.message + " in " + xmlhttp.responseText);
					return;
				}
				refreshFavoritesArray(data);
			} else {
				alert("Error: " + xmlhttp.statusText);
			}
		}
	};
	 
	xmlhttp.open("POST", "/apps/Portal/fs", true);
	xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	var favData = "command=refresh";
	xmlhttp.send(favData);
}

function parseJSONLoad(loaddata) {
	return JSON.parse(loaddata);
}