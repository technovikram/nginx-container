var LContent = new Array();
var defaultOffset = 130;

/**
 * This function will be used to get the hover data & call displayHover(..) to display hover data on screen.
 */
function showHover(scrollableTableName, rowIndex) {
	var  hoverContent;
	hoverContent = eval (scrollableTableName+"_Content["+rowIndex+"]");

	if(hoverContent != undefined) {
		hoverContent=replaceSpecialCharecter(hoverContent);
		displayHover(hoverContent);
	}
}

/**
 * This function will be used to display hover data on screen.
 */
function displayHover(hoverData) {
	var L = document.getElementById('lock');
	var LStyle = L.style;
	var Lc = document.getElementById('lockContent');

	// get the position of the cursor
	if (window.event) { // IE
		clientX = window.event.clientX;
		clientY = window.event.clientY;
	} else { // NN
		clientX = event.clientX;
		clientY = event.clientY;
	}

	x = clientX + parseInt(document.body.scrollLeft);
	y = clientY + parseInt(document.body.scrollTop);

	Lc.innerHTML = hoverData;
	L.style.display = 'block';

	if (x < screen.width / 3) {
		L.style.left = x + "px";
	} else {
		L.style.right = x + "px";
	}

	var hoverHeight = parseInt(L.offsetHeight);
	if ((screen.height - clientY - hoverHeight - defaultOffset) > 0) {
		// Display Hover below to cursor
		L.style.top = y + "px";
	} else if((clientY - hoverHeight) > 0) {
		// Display Hover above to cursor
		L.style.top = (y - hoverHeight) + "px";
	} else {
		// Display Hover with center alignment in respect to cursor
		L.style.top = (y - clientY) + "px";
	}

	var iframe = document.getElementById('hoveriframe');
	iframe.style.left = L.style.left;
	iframe.style.top = L.style.top;
	iframe.style.width = L.offsetWidth;
	//iframe.style.height = L.offsetHeight;
	iframe.style.display = "block";
}

/**
 * This function will be used to hide hover data from screen.
 */
function hideHover() {
	document.getElementById('hoveriframe').style.display='none';
	document.getElementById('lock').style.display='none';
}

/************************************************************************
 * This function replaces special character displayed in a hover.
 ************************************************************************/
function replaceSpecialCharecter(textMsg){
	textMsg = textMsg.replace(/<BR>/g, "\r\n");
	textMsg = textMsg.replace(/&lt;BR&gt;/g, "\r\n");
	textMsg = textMsg.replace(/&amp;/g, "&");
	textMsg = textMsg.replace(/&#39;/, "'");
	textMsg = textMsg.replace(/&lt;/g, "<");
	textMsg = textMsg.replace(/&gt;/g, ">");
	textMsg = textMsg.replace(/&quot;/g, '"');
	return textMsg;
}