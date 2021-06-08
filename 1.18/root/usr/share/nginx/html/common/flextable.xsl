<?xml version='1.0' encoding="ISO-8859-1"?>

<xsl-stylesheet version="1.1" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl-output method="html" encoding="iso-8859-1" />

<!-- 
Author: Joe Orr, copyright 2001.
Use permitted under the same terms as the Perl Artistic License. See
http://www.perl.com/pub/a/language/misc/Artistic.html for more information.

FLEXTABLE.XSL IS A DERIVED FILE. DO NOT EDIT FLEXTABLE.XSL DIRECTLY - YOUR EDITS WILL BE OVERWRITTEN.

To edit this file, see the associated LEO file (flextable.leo).

See associated LEO file for complete documentation, including version information.

-->


<!-- appPrefix: valid values: QN, QE -->
<xsl:param name="appPrefix" select="'QE'"/>

<!-- reportTitle valid values: anything -->
<xsl:param name="reportTitle" select="''"/>

<!-- titleFormat valid values: 'pagehead', 'pagehead2', or add a new custom style to the stylesheet -->
<xsl:param name="titleFormat" select="'pagehead'"/>

<!-- orientation valid values: 'portrait', 'landscape' -->
<xsl:param name="orientation" select="'landscape'"/>

<!-- rowCount valid values: numeric -->
<xsl:param name="rowCount" select="'10'"/>

<!-- navigation valid values: 
	   'true' - navbar will show
	   'false' - navbar will be hidden -->
<xsl:param name="navigation" select="'true'"/>

<!-- pop up window? true or false -->
<xsl:param name="popUp" select="'true'"/>

<!-- customization valid values:
	   'true' - (default) customization dialog will be displayed
	   'false' - customization dialog will not be displayed -->
<xsl:param name="customization" select="'false'"/>

<!-- footnote valid values: any string except 'null': will be displayed.
	 'null' : nothing will be displayed
	 '': "1 of 6 rows" will be displayed -->
<xsl:param name="footnote" select="''"/>

<!-- numOfFrozenCols valid values: a single digit number -->
<xsl:param name="numNonScrollingCols" select="'1'"/>

<!-- leftPanePixelWidth: a single digit number-->
<xsl:param name="leftPanePixelWidth" select="'50'"/>

<!-- table width -->
<xsl:param name="tableWidth" select="792"/>


<xsl:variable name="rightPanePixelWidth">
  <xsl:choose> 
	<xsl:when test="$numNonScrollingCols != '0'"><xsl:value-of select="'770' - $leftPanePixelWidth"/></xsl:when> 
	<xsl:otherwise><xsl:value-of select="'770'"/></xsl:otherwise>
  </xsl:choose>    
</xsl:variable>  


<!-- KLUDGE SECTION 
	 This section should be removed as soon as convenient. 
-->

<xsl:variable name="printReportTitle">
  <xsl:choose>
	<xsl:when test="$appPrefix = 'QE'">SUMMIT Inquiry Results (Fast Print)</xsl:when>
	<xsl:otherwise>Standard Report</xsl:otherwise>
  </xsl:choose>
</xsl:variable>

<!-- END KLUDGE SECTION -->


<!-- if the navigation is turned off, set the number of rows to be displayed to be equal to the total number of rows in the xml -->
<xsl:variable name="newRowCount">
  <xsl:choose>
	<xsl:when test="$navigation = 'false'">
	  <xsl:value-of select="count(//rows/row)"/> 
	</xsl:when>
	<xsl:otherwise>
	  <xsl:value-of select="$rowCount"/>
	</xsl:otherwise>
  </xsl:choose>
</xsl:variable>


<xsl:template match="/">

<html>


<head>


<style type="text/css">
BODY          {font-family:Arial,sans-serif; font-size:8pt; font-weight:100; margin-top:0; margin-left:6; margin-right:0}
TD            {font-family:Arial,sans-serif; font-size:8pt; font-weight:100;}
SELECT        {font-family:Arial,sans-serif; font-size:12px; font-weight:normal}
OPTION        {font-family:Arial,sans-serif; font-size:12px; font-weight:normal}
TH            {font-family:Arial,sans-serif; font-size:12px; font-weight:bold; text-align:left}
BUTTON        {font-size:14; font-weight:bold; width:30; text-align:center}
INPUT         {font-family:Arial; font-size:10pt;}
a:link        {text-decoration:underline;}
a:visited     {text-decoration:underline;}
a:active      {text-decoration:underline;}
a:hover       {text-decoration:underline;}
.openbutton {font-family:Arial,sans-serif; font-size:4pt; font-weight:normal; width:16; height:12;color:black; background-color:gainsboro; border:1px solid gray; text-align:center;}
.pagehead   {color:#0C6EB0; font-family:arial, helvetica, sans-serif; font-weight:bold; font-size:9pt; height:22px;}
.pagehead2  {text-align:center;color:#0C6EB0; font-family:arial, helvetica, sans-serif; font-weight:bold; font-size:11pt;}
.printReportHeader {font-family:Arial,sans-serif; font-size:12pt; font-weight:bold; text-align:center; margin-bottom:5;}
.colhead {color:white; padding-right:0; cursor:hand; background-color:#003366; height:12; text-align:left; font-weight:bold; border-top:1px solid white; border-right:1px solid white;}
.colheadportrait {color:white; cursor:hand; background-color:slateblue; height:12; text-align:center; font-weight:bold; border-bottom:1px solid white;}
.colheadsorted  
	  {color:white; background-color:blue; cursor:hand; text-align:left; font-weight:bold; border-bottom:1px solid white; border-right:1px solid white;  border-top:1px solid white;}
.evenrow  {background-color:#E9F2F2; cursor:hand; xline-height:17px;}
.oddrow   {background-color:#C9E5E7; cursor:hand; xline-height:17px;}
.dialogtable  {border:2px solid #000000;background-color:#E9F2F2;}
.dialogrow    {background-color:#C9E5E7; cursor:hand; xline-height:19px;}
.dataTable{background-color:#FFFFFF}
.datarow  {background-color:lavender;cursor:hand;}
.default  {text-align:right;}
.Text     {text-transform:capitalize}
.Number   {text-align:right;}
.summaryRow   {background-color:#7EBEBE; color:black; text-align:right;}
.summaryItem  {background-color:#7EBEBE; color:black; font-weight:700; font-size:7pt; height:26px; text-align:right;border-top:1px solid white;border-right:1px solid white;}
.summaryItem2 {background-color:#7EBEBE; color:white; font-weight:700; font-size:7pt; text-align:right;border-bottom:1px solid white;}
.highlightedRow {background-color:navy; color:white; cursor:hand}
.navbutton    {cursor:hand}
.cellStylePortrait {text-align:right;text-transform:capitalize;border-right:1px solid white;border-bottom:1px solid white;}
.subHead {color:black; background-color:gainsboro; cursor:hand; height:12; text-align:left; font-weight:bold;}
.subTable {margin-left:20;}
.subRow   {color:white}
.sortLink {color:white;cursor:hand}
.dialogCustom1 {position:absolute; top:4; left:200}
.hSpace1  {height:-1}
.datetime {text-align:right;}
.money    {text-align:right;}
.char     {text-align:left;text-transform:capitalize;}
.varchar  {text-align:left;text-transform:capitalize;}
.decimal {text-align:right;}
.timestamp {text-align:right;}
.default,.Text,.Number,.Date,.datetime,.money,.char,.varchar.decimal,.timestamp {border-top:1px solid white;border-right:1px solid white;}

</style>


<xsl:text>
</xsl:text>


<script>
/** 
 *  Script by Joe Orr copyright 2001 under the Perl Artistic License.
 * 
 *  For information about use see: 
 *  http://www.perl.com/pub/a/language/misc/Artistic.html
 *
 *  col resizing routines adapted from eTablor
 *  http://eplanning.free.fr/eTablor
 *
 *  This is a DERIVED file. The source is in a LEO file.
 *  Formatting of the scripts in this file may not be as intended.
 *  Also, this script is HEAVILY documented in the source LEO file (flextable.leo) 
 *  which should be present in the same directory as this one. 
 *  For information about using LEO see
 *  http://www.jserv.com/jk_orr/leo.htm
 **/

// minor formatting function
function init() {
  <xsl:if test="$customization != 'false'">
  orientation[0].checked = 'true'; 
  </xsl:if>
}



// N.B. LOTS of extra documentation for this code is in the LEO file
// in which the code was created.


// the table object ==============================
/**
 * @numRows      the number of rows to display at a time
 * @index        the starting row for the dataArray, from which comes the table data
 * @id           the DOM id to be given to the DHTML table
 * @name         set this to the same name as the variable holding the instance of this object
 * @dataArray    the name of a two-dimensional array contain the data to be put in the table
 * @container    the html element in which to place this table
 * @colNames     column names (field names)
 * @colTitles    column headings
 * @colTypes     array containing datatype of each cell (determines cell formatting, e.g. right-alignment)
 * @colFormats   array containing data formats for cell item (determines formatting of item, e.g. currency)
 * @orientation  (optional) portrait or landscape
 * @tableStyle   (optional) if 'masterdetail' will display tree grid
 * @totalsHash   (optional) an associate array (hash) containing col name keys and sum values.
 * @detail       (optional) object holding the url for the detail page and list of params.
 *                             When user double clicks on a line, the colum values corresponding to
 *                             the param names will be appended to the url and browser will be
 *                             redirected to the resulting url.
 *
 * if you use one of the 'optional' parameters, you'll have to pass in null for any optional
 * parameters to the left of the optional parameter you are using. True optional parameters
 * aren't available for Javascript 1.2
 */
function clsDHTMLTable (numRows, index, id, name, container, dataArray, colNames, colTitles, colTypes, colFormats, orientation, tableStyle, totalsHash, detail) {
<![CDATA[

  // required parameters =====================================
  this.tableRows = numRows;
  this.startRow  = index;
  this.id        = id;
  this.name      = name;
  this.dataArray = dataArray;
  this.totalRows = dataArray.length;
  this.container = container;
  this.names     = colNames;
  this.titles    = colTitles;
  this.types     = colTypes;
  this.formats   = colFormats;
  // end of required parameters section =======================

  // optional parameters ======================================  
  // orientation:  
  //   landscape = col header (normal database table presentation, field name is in col header)
  //   portrait  = row header (rows become columns, field name is in row header)
  this.orientation = orientation;
  if (! this.orientation) this.orientation = 'landscape';
  this.tableStyle = tableStyle; // normal or master detail
  if (! this.tableStyle) this.tableStyle = 'normal';
  this.totalsHash = totalsHash; // associative array (hash) containing col names and totals
  this.details = oDetailJSP;
  // end of optional parameters section =======================

  // used for remembering which row is highlighted
  this.highlightedRow = null;
  // used for holding col totals (which we might calculate ourselves)
  this.colTotals = new Array();

  // array to hold flag indicating whether a given column is to have
  // a total calculated by the script
  this.totalFlags = new Array();

  // array to hold list of columns that will not scroll horizontally (they will be
  // placed in left side, outside of horizontally scrolling window)
  this.nonScrollingColumns = new Array();

  // other properties 
  this.mixedCase = true;
  this.divHeight = 0; //if this is greater than 0, the table will be displayed in a scrolling window
  this.showLineNums = false;
  this.colPickList = false;
  this.tableWidth = ]]><xsl:value-of select="$tableWidth"/><![CDATA[

  // next property is currently not being used but is used when 
  // implementing single-click multicolumn sort
  this.numOfColumnsToSort = 2;

  // create an array to hold a list of the indexes in the order in which
  // you want them displayed. This is used for "moving" columns around.
  this.columnIndexes = new Array();
  for (i = 0; i < this.dataArray[0].length; i++) this.columnIndexes[i] = i;

  // Do the same thing for the rows. This is used for sorting rows.
  this.rowIndexes = new Array();
  for (i = 0; i < this.dataArray.length; i++) this.rowIndexes[i] = i;

  // An array to add arbitrary functions to summarize a column
  // For future functionality
  //this.sumFunctions = new Array();
  //for (i = 0; i < this.columnIndexes.length; i++) this.sumFunctions[i] = 'nothing';

  // An array to hold the styles so we can do stuff like overwrite the cursor
  // for all styles with the hourglass icon and then restore the original.
  // This array is describing something in the page (the stylesheet) so it isn't really
  // necessary to put inside the object. However, this is done to make the code more
  // component-like.
  this.rules = new Array();

  // for remembering which row we are currently on
  this.currDetailRow = -2; 

  // for remembering which row we are currently on
  this.currHighlightedRow = -2; 

  // resize table after window has been resized  
  this.resized = false;
  window.onresize = this.flagResize;


]]>
}



<![CDATA[
/**
 * Set the number of rows that the table will display
 * @param numRows   The number of rows to display. This can be changed at any time, and 
 *                  the table will redraw with the requested number of rows. If the table
 *                  is displaying in portrait mode, this is actually the number of columns,
 */
function setTableRows (numRows) {
  numRows = numRows / 1;  // make sure Javascript knows that it is a number
  if (numRows == "") numRows = this.tableRows;
  if (numRows < 2) {alert("At least 2 records must be displayed."); return}
  if (numRows > this.totalRows) {numRows = this.totalRows}
  if (numRows > 50) {alert("Maximum of 50 rows may be displayed"); numRows = 50;}
  this.tableRows = numRows / 1;  
  this.startRow = 0;
  if (this.orientation == 'landscape') {
	//if (this.divHeight > 0) this.divHeight = numRows * 24 + 90; 
  }
  this.drawEmptyTable();
  this.fillTable();
}
/**
 * Set which is the first record (from the array of data) from which the table
 * will start filling.
 *
 */ 
function setStartRow (r) {
  r = r / 1;  // make sure it Javascript knows that it is a number
  if (r + this.tableRows > this.totalRows) {
	r = this.totalRows - this.tableRows;      
  }
  if (r < 0) r = 0;
  this.startRow = r;
  this.fillTable();
}

function setOrientation (x) {
  if (x != 'portrait' && x != 'landscape') return; 
  this.orientation = x;
  if (x == 'portrait') {
	//this.divHeight = this.columnIndexes.length * 26;
  } else {
	//this.divHeight = this.tableRows * 24 + 90;
  }
  this.drawEmptyTable();
  this.fillTable();
}

// next function not currently in use
function setNumOfColumnsToSort (i) {
  if (i < 4 && i > 0) this.numOfColumnsToSort = i;
}

]]>


<![CDATA[

// Next three functions are for remembering what row is the
// current detail row (the row being viewed in detail view).
function getCurr() {
  return rows[this.currDetailRow + this.startRow][0];  
}

function getNext() {
  if (this.currDetailRow + this.startRow < this.dataArray.length - 1) {
	return rows[this.currDetailRow + this.startRow + 1][0];
  } else {
	return -1;
  }  
}

function getPrev() {
  if (this.currDetailRow > 0) {
	return rows[this.currDetailRow + this.startRow - 1][0];
  } else {
	return -1;
  }

}

]]>


<![CDATA[

function calculateColTotals() {

  var summClass = 'summaryItem';
  if (this.orientation == 'portrait') summClass = 'summaryItem2';

  for(c = 0; c < this.columnIndexes.length; c++){
  	total = "&nbsp;";

  	// if flags have been set for us to calculate the col totals, do so now
  	if (this.totalFlags[c] != undefined) {
  	  total = 0;
  	  for (j = 0; j < this.totalRows; j++) {
  		num = this.dataArray[j][c];
  		num = num / 1 ;
  		total += num;
  	  }
  	  total = total * 100;
  	  total = Math.round(total)
  	  total = total / 100;
  	  if (this.formats[c] == "MYF") total = this.formatItem(total, "MYF");
  	}
  	// if col totals have been passed in via the hashTotals, use those. 
  	if (this.totalsHash) {
  	   // if there is key in the totalsHash corresponding to the name of
  	   // the current col, then get the value for that key as the total
  	   if (this.totalsHash[this.names[c]] != undefined) {
  		 total = this.totalsHash[this.names[c]];
  		   // format the total based according to the format specified for the current col
  		   total = formatItem(total, this.formats[c]);
  		 }
  	}	
  	this.colTotals[c] = "<td class='" + summClass + "'><nobr>" + total + "</nobr></td>";	
  }

}  

]]>



<![CDATA[

function drawEmptyTable() {
  var rowStyle;
  var cellStyle;
  var html = '';

  // start table dhtml (main dhtml, will be right pane when there are two panes)
  html += "<table id='" + this.id + "' border='0' cellpadding='2' bgcolor='white' cellspacing='0' STYLE='border-collapse:collapse;border-color:white;' class='dataTable';>";

  // start container table with left pane for holding non-scrollable columns
  // and right pane to hold the data table
  html = '<table border="0" cellspacing="0" cellpadding="0"><tr>'
	 + '<td valign="top"><div id="leftPane"></div></td>'
	 + '<td><div id="rightPane" style="width:' + this.tableWidth + '; overflow-X:auto;">' 
	 + html    

  
    
		var aHeadings = new Array();
		var nowrap = "";
		var item;

		//var colHeadClass = "colheadportrait"
		//if (this.orientation == 'portrait') {
		//  nowrap = " nowrap ";
		//  colHeadClass = "colheadportrait";
		//}

		var pickList = "";

		for(c = 0; c < this.columnIndexes.length; c++){

		  // if picklist will appear in place of col headers
		  if (this.pickList) {
			
				  pickList = "<select onclick=\"window.event.cancelBubble = true;\" onchange='dataTable.changeCol(" + c + ", this.value, this.options[this.selectedIndex].text)'>";
				  // loop thru all of the field titles to create a pick list
				  for (cc = 0; cc < this.columnIndexes.length; cc++) {
					pickList += "<option value='";
					pickList += cc;
					pickList += "'";
					if (cc == this.columnIndexes[c]) pickList += " selected ";
					pickList += ">" + this.titles[cc];
					pickList += "</option>";
				  }
				  pickList += "</select>";
				  item = pickList;
				} else {

				  item = this.titles[this.columnIndexes[c]];
				  item = '<span class="sortLink">' + item + '</span>';
			  	  	
		  }

		  if (this.orientation == 'landscape') {
			
					  aHeadings[c] = '<td' 
			  		  + ' class="colhead" ' 
			  		  + nowrap + ' col="' + c + '" id="' + this.id + 'Col' + c + '">' 

					  // mini table to contain header + resize link
					  + '<nobr>'
					  + '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr>' 
					  // label (col head text)
					  + '<td  onmousedown="dataTable.showHourGlass();" title="Click to Sort Table on This Column"' 
					  + ' onclick="dataTable.sortRows(this.parentElement.parentElement.parentElement.parentElement.parentElement, ' + c + ',1); "'		  
			//          + ' onclick="dataTable.sortRows(' + this.id + 'Col' + c + ',' + c + '); "'		  
					  + '>'
					  + '<nobr id="colLabel"><b>' + item + '</b></nobr>' 
					  + '</td>'
					  // resizing handle
					  + '<td onmouseover="this.style.cursor=\'E-resize\'" onmousedown="colresize=true;dataTable.TDselDown()" style="width:8" title="Drag to Resize" >&nbsp;&nbsp;</td>'
					  + '</tr></table>'
					  + '</nobr>'
					  // end of mini table

					  + '</td>';
			
		  } else {
			aHeadings[c] = '<td ' 
			 + ' class="colheadportrait" ' 
			 + nowrap + ' col="' + c + '" id="' + this.id + 'Col' + c + '">' + item + '</td>';
		  }

		}

		// add col headers to html
		if (this.orientation != 'portrait') { 
		  if (this.tableStyle == 'masterDetail') {
			html += "<tr><td class='openButton' nowrap> &nbsp; </td>";
			for (i = 0; i < aHeadings.length; i++) html += aHeadings[i];
			html += "</tr>";
		  } else {
			html += "<tr>";
			for (i = 0; i < aHeadings.length; i++) html += aHeadings[i];
			html += "</tr>";
		}

	  }
	

    this.calculateColTotals();  

    var maxR = this.tableRows;
    var maxC = this.columnIndexes.length;

    // If in portrait orientation, the table is in effect rotated 90 degrees to the left
    // Therefore, the rows become columns and the columns become rows, from the standpoint 
    // of the original orientation.
    if (this.orientation == 'portrait') {
  	maxR = this.columnIndexes.length;
  	maxC = this.tableRows;
    }
    var startC = 0;
    if (this.showLineNums) startC = -1;

    
	  for(r = 0; r < maxR; r++){

	  	// alternate the row styles
	  	rowStyle = 'oddrow';
	  	if (r % 2 == 0) rowStyle = 'evenrow';

	  	if (this.tableStyle == 'masterDetail') rowStyle = 'dataRow';

	  	// TR
		html += "<tr ondblclick='" 
	  			   + this.name + ".goSubreport(this);'" 
	  			   + " class='" + rowStyle + "'" 
	  			   + " onclick='" + this.name + ".highlightRow(this); selection.empty()'" 
	  			   + " rowIndex=" + r 
	  			   + ">";

	  	// if it is portrait format, then put field titles in first cell of each row
	  	if (this.orientation == 'portrait') {
	  	   html += aHeadings[r];
	  	}

	  	// Master-Detail button
	  	if (this.rowStyle == 'masterDetail') {
	  	  html += "<td class='openButton' onclick='" + this.name + ".toggleRowOpen(this);'" + ">+</td>";
	  	}

	  	// TD
		for(c = startC; c < maxC; c++){
	  	  cellStyle = this.types[this.columnIndexes[c]];
	  	  if (this.orientation == 'portrait') cellStyle = 'cellStylePortrait';
	 	  html += '<td nowrap class="' + cellStyle + '" ><nobr>&nbsp;</nobr></td>';	
	  	}

	  	// if it is portrait format, then put totals in last cell of row
	  	if (this.orientation == 'portrait') html += this.colTotals[r];

	  	html += "</tr>";

		if (this.tableStyle == 'masterDetail') {
		  
		  var subTable;
		  var sr;
		  var sc;
		  subTable = '<table border="0" class="subTable" STYLE="border-collapse:collapse">';
		  for (sr = 0; sr < 3; sr++) {
		    if (sr == 0) {
		  	subTable += '<tr class="subhead">';
		  	subTable += '<td>Property</td><td>Street Address</td><td>City</td><td>State</td><td>Zip</td><td width="300">Description</td>';
		    } else {
		  	subTable += "<tr>";
		  	for (sc = 0; sc < 6; sc++) {
		  	  subTable += '<td class="subCell">' + " abcxyz " + '</td>';
		  	} 
		    }
		    subTable += "</tr>";
		  }
		  subTable += '</table>';

		  html += '<tr STYLE="display:none"><td colspan="' 
		  		+ this.columnIndexes.length + '">' 
		  		+ subTable 
		  		+ '</td></tr>';
		  
		}

	  } // end of row loop
	
    
		  // Footer row for summaries. 
		  var total;
		  var num;
		  html += "<tr class='summaryRow'>";
		  if (this.orientation != 'portrait') {
			if (this.tableStyle == 'masterDetail') {
			  html += '<td class="openButton" id="openButton">&nbsp;</td>';
			}
			for (i = 0; i < this.colTotals.length; i++) html += this.colTotals[this.columnIndexes[i]];
			html += "</tr>";
		  }
		  

    // finish data table (right pane)
    html += "</table>";
  	 

  // close container table (that has left pane and right pane)
  html += '<br></div></td></tr></table>';

  
    // start box to display record count and current index and navbar
    html += '<table border="0" width="100%"><tr>';
    html += "<td align='left' nowrap align='left'><span id='" + this.id + "Footer'></span></td>"

     
	    /*
	 	* add navbar. This consists of 4 button images.
	 	* Each button has an id which consists of the table id (dom id of the dthml table) concatenated with:
	 	*   buttonFirst, buttonPrev, buttonNext, buttonLast
	 	* Each button has the onclick event linked to an appropriate method:
	 	*   goFirst, goPrev, goNext, goLast 
	 	*/
	 	var b1 = '<img' 
	   		   + ' onclick="' + this.name + '.goFirst()"' 
	   		   + ' id="' + this.id	+ 'ButtonFirst" ' 
	   		   + ' alt="First Record" '
	   		   + ' style="cursor:hand;filter:gray alpha(opacity=20)" '
	   		   + ' src="2left.gif">'; 
	 	var b2 = '<img' 
	   		   + ' onclick="' + this.name + '.goPrev()"' 
	   		   + ' id="' + this.id	+ 'ButtonPrev" '
	   		   + ' alt="Prev Page" ' 
	   		   + ' style="cursor:hand;filter:gray alpha(opacity=20)"'
	   		   + ' src="left.gif">'; 
	 	var b3 = '<img' 
	   		   + ' onclick="' + this.name + '.goNext()"' 
	   		   + ' id ="' + this.id	+ 'ButtonNext" ' 
	   		   + ' alt="Next Page" ' 
	   		   + ' style="cursor:hand;filter:gray alpha(opacity=20)" '
	   		   + ' src="right.gif">'; 
	 	var b4 = '<img' 
	   		   + ' onclick="' + this.name + '.goLast()"' 
	   		   + ' id ="' + this.id	+ 'ButtonLast" ' 
	   		   + ' alt="Last Page" ' 
	   		   + ' style="cursor:hand;filter:gray alpha(opacity=20)" '
	   		   + ' src="2right.gif">'; 	

	 	var navBarStyle = 'display:block';  

	 	]]>

	 	<xsl:choose>
	 	<xsl:when test="$navigation != 'true'">
	   	 <![CDATA[navBarStyle = 'display:none';]]>
	 	</xsl:when>
	 	<xsl:otherwise>
	 	</xsl:otherwise>
	 	</xsl:choose>

	   <![CDATA[

	   var navBar = '<td align="left">&nbsp;' 
	 	 + '<table cellspacing="0" cellpadding="0" border="0" style="' + navBarStyle 
	 	 + ';position:absolute;left:600px;"><tr>' 
	 	 + '<td>' + b1 + '</td><td>' + b2 + '</td><td>' + b3 + '</td><td>' + b4 + '</td>'
	 	 + '</tr></table>'
	   	 + '</td>'

	 	html += navBar;
	 

    // close box to display record count and current index and navbar
    html += '</table>';
  

  
  html+= '<div id="TDsel" onmouseover="dragTD=true" onmouseout="dragTD=false" '
  		 + 'onmousemove="dataTable.TDselMove()" onmouseup="dataTable.TDselUp()"'
  		 + ' style="position:absolute;filter:alpha(opacity=30);border:2 solid black;top:0;left:-1000;height:100%;z-index:2;background-color:thistle" ></div>';
  

  // render the table
  eval (this.container + ".innerHTML = html");

}

]]>


<![CDATA[
/*
 *@showNavigation  If not false, the navbuttons will be greyed as appropriate. This
 *                 doesn't determine whether the buttons exist, only whether they 
 *				   are updated to show the current navigable status of the widget.
 */
function fillTable(showNavigation) {

  var maxR = Math.min(this.tableRows, this.totalRows);
  var maxC = this.columnIndexes.length;
  var startC = 0;
  var oDHTMLTable = eval(this.id);

  var colShift = 0;
  if (this.tableStyle == 'masterDetail') colShift++;
  var rowShift = 0;

  if (this.tableStyle == 'masterDetail') {
	
	for(r = 0; r < maxR; r++){
	  for(c = 0; c < maxC; c++){
		oDHTMLTable.rows(r * 2 + 1).cells(c + colShift).innerHTML = this.formatItem(this.dataArray[this.rowIndexes[r +  this.startRow]][this.columnIndexes[c]], this.formats[this.columnIndexes[c]]);
	  }
	}
		   
  } else {
	if (this.orientation == 'portrait') {
	  
	  maxR = this.columnIndexes.length;
	  maxC = Math.min(this.tableRows, this.totalRows);
	  for(c = 0; c < maxC; c++){
	    for(r = 0; r < maxR; r++){
	  	oDHTMLTable.rows(r + rowShift).cells(c + 1).innerHTML = this.formatItem(rows[this.rowIndexes[c +   this.startRow]][this.columnIndexes[r]], this.formats[this.columnIndexes[r]], this.types[this.columnIndexes[r]]);
	    }
	  }
	  changeStyle('.colhead', 'height', '12');
	  
	} else if (this.orientation == 'landscape') {
	  
	  for(r = 0; r < maxR; r++){
	    for(c = 0; c < maxC; c++){
	  	//tmp = this.formatItem(this.dataArray[this.rowIndexes[r +  this.startRow]][this.columnIndexes[c]], this.formats[this.columnIndexes[c]],this.types[this.columnIndexes[c]])
	  	tmp = this.formatItem(this.dataArray[r +  this.startRow][this.columnIndexes[c]], this.formats[this.columnIndexes[c]],this.types[this.columnIndexes[c]])
	  	//tmp = '<nobr>' + tmp + '</nobr>';
	  	oDHTMLTable.rows(r + 1).cells(c + colShift).firstChild.innerHTML = tmp;
	    }
	  }
	  changeStyle('.colhead', 'height', '42');
	  
	}  
  } ]]>
  
  // table footer ("1 - 5 of 100 rows found")
  <xsl:choose>
  <xsl:when test="$footnote = ''">
  var f = (this.startRow + 1) + " - " + (Math.min(this.startRow + this.tableRows, this.totalRows)) 
     + " of " 
     + this.totalRows + " found ";
  eval (this.id + "Footer.innerHTML = '" + f + "'"); 
  </xsl:when>
  <xsl:when test="$footnote = 'null'">
  </xsl:when>
  <xsl:otherwise>
  eval (this.id + "Footer.innerHTML = '" + "<xsl:value-of select="$footnote"/>" + "'"); 
  </xsl:otherwise>
  </xsl:choose>
  
<![CDATA[

  
  if (showNavigation != false) {
    eval (this.id + 'ButtonFirst.style.filter = ""');
    eval (this.id + 'ButtonPrev.style.filter = ""');
    eval (this.id + 'ButtonNext.style.filter = ""');
    eval (this.id + 'ButtonLast.style.filter = ""');
    if (this.startRow == 0) {
  	eval (this.id + 'ButtonFirst.style.filter = "gray alpha(opacity=20)"');
  	eval (this.id + 'ButtonPrev.style.filter = "gray alpha(opacity=20)"');
    } 
    if (this.startRow + this.tableRows >= this.totalRows) {
  	eval (this.id + 'ButtonNext.style.filter = "gray alpha(opacity=20)"');
  	eval (this.id + 'ButtonLast.style.filter = "gray alpha(opacity=20)"');
    } 
  }
  
  if (this.orientation == 'landscape') {
	
	  var leftPaneHTML = "";

	  // get a ref to the DHTML Table;
	  var oDHTMLTable = eval(this.id);
	  var maxTableR = oDHTMLTable.rows.length;

	  
	    for (r = 0; r < maxTableR; r++) {

	    	// skip if not landscape mode
	    	if (this.orientation != 'landscape') break;

	    	// create the tr start tag, and copy the row style from the data table
	    	//leftPaneHTML += '<tr ';
	    	var rowClass = oDHTMLTable.rows(r).className;
	    	var currRowIndex = oDHTMLTable.rows(r).rowIndex;

	    	leftPaneHTML += "<tr ondblclick='"  + this.name + ".goSubreport(this);'" 
	   	  + " class='" + rowClass + "'" 
	   	  + " onclick='" + this.name + ".highlightRow(this)'" 
	   	  + " rowIndex='" + currRowIndex + "'"
	  	  + ">";

	  	
		    	for (c = 0; c < this.nonScrollingColumns.length; c++) {
		    	  // skip the column if it hasn't been given a 'true' value in
		    	  // the non-scrolling columns Array.
		    	  if (this.nonScrollingColumns[c] == undefined) continue;
		    	  if (! this.nonScrollingColumns[c]) continue;

		    	  // copy the cell to the left pane 
		    	  // first unhide the cell in the right pane in case it has been hidden
		    	  oDHTMLTable.rows(r).cells(c).style.display = "block";
		  	  leftPaneHTML += oDHTMLTable.rows(r).cells(c).outerHTML;
		    	  // hide the cell in the right pane
		    	  oDHTMLTable.rows(r).cells(c).style.display = "none";
		    	}
		  

	    	leftPaneHTML += '</tr>';
	    }
	  
	  
	    leftPane.innerHTML = 
	    '<table ' 
	  	 + 'id = ' + this.id + 'LeftPaneTable '
	  	 + 'style="background-color:white; border-collapse:collapse;" '
	  	 + 'cellpadding="2" border="0" cellspacing="0" bgcolor="black"'
	  	 + '>' 
	  	 + leftPaneHTML 
	  	 + '</table><br>';
	    rightPane.style.width = this.tableWidth - (eval (this.id + "LeftPaneTable.clientWidth"));
	  

	  
	    var oLeftPane = eval(this.id + 'LeftPaneTable');
	    for (i = 0; i < oLeftPane.rows(0).cells.length; i++) {
	  	oLeftPane.rows(0).cells(i).col = i;
	    }
	    var oRightPane = oDHTMLTable;
	    for (j = 0; j < oRightPane.rows(0).cells.length; j++) {
	  	if (oRightPane.rows(1).cells(j).style.display != 'none') {
	  	  oRightPane.rows(0).cells(j).col = j;
	  	}
	    }
	  
	  
  }
}
]]>

 

<![CDATA[

/**
 * Format an item, e.g. convert a date from 1999-10-01 to 10/01/99.
 * 
 * @item        The item to be formatted.
 * @formatName  The format to use. When you construct a clsDHTMLTable object, you may pass the
 *              the constructor an array containing a list of column formats. To add a new
 *              format, simply edit the "switch" statement below.
 */ 
function formatItem(item, formatName, dataType){

  try {
	dataType = dataType.toUpperCase();
  } catch (e) {

  }

  switch (dataType) {
  case "DECIMAL":
	formatName = "MYF";
	break;
  case "TIMESTAMP":
	formatName = "SDT";
	break;
  case "default":
	formatName = "MYF";
	break;
  case "DATE":
	formatName = "SDT";
	break;
  default:

  }

  if (item == 'null') return "&#160;";
  if (item == '') return "&#160;";

  var myItem = item;
  if (myItem == undefined) return;
  if (myItem.length < 3) return myItem;

  switch (formatName) {
	case "default":
	case "money":
	case "MY":
	case "MYF": 
		//if (myItem > 1) {myItem = myItem / 1};
		myItem = myItem / 1; // get rid of exponential notation
		myItem = myItem.toString();
	  if (myItem.indexOf('.') == -1) myItem += ".00";
		myItem += "0000"; // make sure we've go enough zeros on end
	  myItem = myItem.replace(/(\.\d\d)\d+/, "$1"); // truncate to 2 dec places    
	  myItem = commify(myItem);
	  break;    
  case "MYD": // drop pennies
	myItem = Math.floor(myItem / 1);
	myItem = commify(myItem);
	break;
  case "MYT": // amount in thousands
	myItem = Math.floor(myItem / 1000);  
	myItem = commify(myItem);
	break;
  case "MYM": // amount in millions
	myItem = Math.floor(myItem / 1000000);  
	myItem = commify(myItem);
	break;
  case "RTF": // format rate forced
	myItem = myItem / 1; // get rid of exponential notation
	myItem = myItem.toString();
	if (myItem.indexOf('.') == -1) myItem += ".00";
	myItem += "0000"; // make sure we have enough zeros on end
	myItem = myItem.replace(/(\.\d\d\d)\d+/, "$1"); // truncate to 3 dec places    
	break;
  case "datetime":
  case "SDT":
	myItem = myItem.replace(/^(\d\d)(\d\d)-(\d\d)-(\d\d).*/, "$3/$4/$2"); // rearrange the data items
	break;
  default: 
	 // remove leading and trailing spaces
	 myItem = myItem.replace(/^\s+/, '');
	 myItem = myItem.replace(/\s+$/, '');

	// kludge alert: some code fields have format type = 'text'. So assume
	// that anything below 4 chars is a code.
	if (this.mixedCase) {
	if (myItem.length > 3) myItem = myItem.toLowerCase();

	// fields which are text with mixed numbers and letters and no spaces are codes and should
	// be in caps 
	if ((myItem.search(/\s/) == -1) && (myItem.search(/\d/) != -1) && (myItem.search(/[A-Za-z]/) != -1)){
	  myItem = myItem.toUpperCase();
	}

  }

	// roman numerals in text fields
		myItem = myItem.replace(/\sii$/g, ' II');
		myItem = myItem.replace(/\siii$/g, ' III');
		myItem = myItem.replace(/\siv$/g, ' IV');
		myItem = myItem.replace(/\svi$/g, ' VI');
  }
  return myItem;
}

]]>


var lLeft;
var oPaneDiv;
var currCol;
var oDHTMLTable = eval(this.id);
function TDselDown(){

  // find out height of the title bar, if any
  titleHeight = 0;
  try { titleHeight = tableHeader.clientHeight } catch (e) {}

  // the TD element for the col head
  //              TD            TR          TABLE          NOBR         TD
  oEL = event.srcElement.parentElement.parentElement.parentElement.parentElement;

  // the NOBR element for the first cell
  currCol = oEL.col / 1;

  // currCol = this.columnIndexes[currCol];
  // alert(currCol);

  // the DIV element holding the data table
  oPaneDIV = oEL.parentElement.parentElement.parentElement.parentElement;

  // the TD containing the data table (this will be either left or right pane
  oPaneTD = oEL.parentElement.parentElement.parentElement.parentElement.parentElement;

  // change the TDsel style
  tst=TDsel.style;

  // we need the offset of the TD for this col, plus
  // the offset of the TD holding the pane (e.g. right pane)
  // minus how much the pane has been scrolled
  tst.pixelLeft=oEL.offsetLeft + oPaneTD.offsetLeft - oPaneDIV.scrollLeft + 5;
  tst.posWidth=oEL.offsetWidth; 

  var oDHTMLTable = eval(this.id);
  tst.pixelHeight=(oDHTMLTable.offsetHeight); 
  tst.pixelTop=titleHeight+1;
  lLeft=tst.pixelLeft;
  dragTD=true; 
  TDsel.setCapture()

}

function TDselMove(){

  var oDHTMLTable = eval(this.id);
  TDcellWidth=event.clientX + oDHTMLTable.scrollLeft + oDHTMLTable.scrollTop - lLeft + 8;

  // resize TDsel
  TDsel.style.posWidth = TDcellWidth;

}

function TDselUp(){  

  var oDHTMLTable = eval(this.id);

  TDsel.releaseCapture();

  TDcellWidth = Math.max(TDcellWidth, 5);

  oRightPane = eval(this.id);
  oLeftPane = eval(this.id + "LeftPaneTable");

  if (oPaneDIV.id == 'leftPane') {

	label = colLabel(currCol);

	// loop thru the NOBR elements in each field in the column
	var oLeftPaneDHTML = eval(this.id + "LeftPaneTable");
	for (r = 1; r &lt; oLeftPaneDHTML.rows.length; r++) {
	  // get the NOBR element in the cell
	  nobrEL = oLeftPane.rows(r).cells(currCol).firstChild;
	  nobrEL.style.overflow = 'hidden';
	  nobrEL.style.width=TDcellWidth;
	}
	label.style.overflow = 'hidden';
	label.style.width = TDcellWidth - 4;
	oRightPane.parentElement.style.width = Math.max(this.tableWidth - oLeftPane.clientWidth, 10);
  }

  label = colLabel(currCol + this.nonScrollingColumns.length);

  // loop thru the NOBR elements in each field in the column
  for (r = 1; r &lt; oDHTMLTable.rows.length; r++) {
	// get the NOBR element in the cell
	nobrEL = oRightPane.rows(r).cells(currCol).firstChild;
	nobrEL.style.overflow = 'hidden';
	nobrEL.style.width=TDcellWidth;
  }
  label.style.overflow = 'hidden';
  label.style.width = TDcellWidth - 4;

  // move TDsel off the screen
  TDsel.style.left=-1000;

}


<![CDATA[

/** 
 * highlightRow
 *
 * @me  The element that was clicked on.
 *
 */
function highlightRow(me) {

  tmpOldRowStyle = me.className;

  // hilite row (this will hilite the row in the right pane regardless of which
  // pane was clicked on
  eval(this.id + ".rows(" + (me.rowIndex / 1 +  1) + ").className = 'highlightedRow'");   

  // unhighlight previously highlighted row
  if (this.currHighlightedRow != -2) {
	eval(this.id + ".rows(" 
	+ (this.currHighlightedRow + 1) + ").className = '" + this.oldRowStyle + "'");   
  }

  // try to hilight the same row in the left pane (there may be no
  // columns in the left pane, so put this in a try clause).
  try {
	// hilite row
	eval(this.id + "LeftPaneTable.rows(" + (me.rowIndex / 1 +  1) + ").className = 'highlightedRow'");   
	// unhilite previously hilited row
	if (this.currHighlightedRow != -2) {
	  eval(this.id + "LeftPaneTable.rows(" 
	  + (this.currHighlightedRow + 1) + ").className = '" + this.oldRowStyle + "'");   
	}
  } catch (e) {
	// do nothing
  }

  // save the current index for use with getnext and getprev functions
  // and to show which row was prev highlighted
  this.currDetailRow = (me.rowIndex / 1);

  this.currHighlightedRow = (me.rowIndex / 1);

  this.oldRowStyle = tmpOldRowStyle;

  this.resize();

}


/* changeStyle : change a CSS style in the document
 *
 *@styleName : name of style to change, e.g. TD or .custom1
 *@key       : e.g. width or font-family
 *@value     : value to be set
 *
 * example: changeStyle(".custom", "line-height", "6px");
 */
function changeStyle(styleName, key, value) {

  var myRules = document.styleSheets[0].rules;
  var size;
  var lineHeight = "";
  for (i = 0; i < myRules.length; i++) {
	if (myRules[i].selectorText == styleName) {
	  eval ("myRules[i].style." + key + " = " + value);
	  break; 
	}
  }	

}


function toggleRowOpen(me) {
  var myDisplay;
  if (this.tableStyle == 'masterDetail') {
	 myDisplay = me.parentNode.nextSibling.style.display;
	 if (myDisplay != 'none') {
	   myDisplay = 'none';
	   me.innerHTML = '+';
	 } else {
	   myDisplay = 'block';
	   me.innerHTML = '&minus;';
	 }
	 me.parentNode.nextSibling.style.display = myDisplay;
  }

  if (this.highlightedRow != null) {
	this.highlightedRow.className = this.oldRowStyle;
  }
  this.oldRowStyle = me.className;
  me.className = "highlightedRow";
  this.highlightedRow = me;  

}

function closeAll() {
  if (this.tableStyle == 'masterDetail') {
	var r;
	var maxRows = this.tableRows;
	var runMe;
	for (r = 1; r <= maxRows; r++) {
	  runMe = (this.id + '.rows(' + (r * 2) + ').style.display = "none";');
	  eval(runMe);
	  runMe = (this.id + '.rows(' + (r * 2 - 1) + ').cells(0).innerHTML = "+";');
	  eval(runMe);
	}
  } else {
	alert("Nothing to close!");
  }
}

function openAll(){
  if (this.tableStyle == 'masterDetail') {
	var r;
	var maxRows = this.tableRows;
	var runMe;
	for (r = 1; r <= maxRows; r++) {
	  runMe = (this.id + '.rows(' + (r * 2) + ').style.display = "block"');
	  eval(runMe);
	  runMe = (this.id + '.rows(' + (r * 2 - 1) + ').cells(0).innerHTML = "&minus;"');
	  eval(runMe);
	}
  } else {
	alert("Nothing to open!");
  }
}


]]>


<![CDATA[


function zoom(op) {
  eval("z = z " + op + " 10");
//  alert(z);
  for (i = 0; i < repWindow.fastReportTable.length; i++) {
	repWindow.fastReportTable(i).style.zoom =  z + '%';
  }
}        

// for use by fast report window: resize the report so that the at
// least the first table of data is no longer than 1000 pixels wide.
// This way it should print out on one A4 piece of paper (landscape)
function initFastReport() {


  var w = repWindow.fastReportTable(0).clientWidth;
  resizePct = 940 / w;

  for (i = 0; i < repWindow.fastReportTable.length; i++) {
	repWindow.fastReportTable(i).style.zoom = resizePct;
  }

}


var repWindow; // this will hold a pointer to the print report window

// for use by fast report window 
var z = 100;

function makeReport() {

  // zoom variable: see above
  z = 100;

  var d = new Date();
  var today = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getYear();
  var repHeader = '<table  align="center"><tr><td width="33%" style="border:0px"></td><td width="33%" style="border:0px" class="printReportHeader" align="center">]]><xsl:value-of select="$printReportTitle"/><![CDATA[</td><td style="border:0px" align="center" width="33%" id="zoomMenuHolder"></td></tr></table>';

  var zoomMenu = '<span class=\'zoomMenu\'><a href="javascript:top.opener.zoom(\'+\')">zoom in</a> &#160; <a href="javascript:top.opener.zoom(\'-\')">zoom out</a></span>'; 
  zoomMenu = '';

  if (repWindow != undefined) {
	repWindow.close();
  }
  repWindow = null;
  repWindow = window.open("",repWindow,
	"height=600,width=1040,status=no,toolbar=no,menubar=yes,scrollbars=yes,location=no,left=10,top=10");
  repWindow.focus();

  // loading 1 of 10 rows
  repWindow.document.write('<div align="center" class="printReportHeader" id="tmpmsg">Loading row <span id="rowIndex">0</span> of ' + this.dataArray.length + ' rows.</div>');

  // this var will hold the html for displaying the main table
  myHTML = "";	  
  var tableHeader = "";

  myHTML = '\n<html><head><style type="text/css">\n'
  		 + 'BODY    {font-family:Arial,sans-serif; font-size:8pt; font-weight:100; margin-left:0;}\n'
  		 + 'TR      {font-family:Arial,sans-serif; font-size:8pt; font-weight:100; }\n'
  		 + 'TD      {font-family:Arial,sans-serif; font-size:8pt; font-weight:100; border:1px solid gray;text-transform:capitalize;}\n'
  		 + '.colheader {color:black; background-color:#DDDDDD; height:30}'
  		 + '.summaryItem {color:black; font-weight:bold; background-color:#DDDDDD; height:30; text-align:right}'
  		 + '.default   {text-align:right;}\n'
  		 + '.Text   {text-transform:capitalize}\n'
  		 + '.Number   {text-align:right;}\n'
		 + '.zoomMenu  {font-size:9px}\n'
		 + '@media print {\n'
		 + '  .zoomMenu {display:none}\n'
		 + '}\n'
	   + '.printReportHeader {align:center; font-family:Arial,sans-serif; font-size:10pt; font-weight:bold; text-align:center; height:20; margin-bottom:5;}\n'
  		 + '</style>\n'
  		 + '</head><body onload="top.opener.initFastReport()">\n'
  		 + repHeader;


  tableHeader = '\n<div style="height:620;" class="printPage"><table STYLE="border-collapse:collapse" cellpadding="2" id="fastReportTable" width="100%">\n';

  // data table headers (a string containing the html for the col header row)
  tableHeader += '<tr class="colheader">';
  for (c = 0; c < this.columnIndexes.length; c++) {
	tableHeader = tableHeader + "<td><b>" + this.titles[this.columnIndexes[c]] + "</b></td>";
  }
  tableHeader += '</tr>';

  var cellData;
  var cellStyle;
  var maxR = this.dataArray.length;
  var maxC = this.dataArray[0].length;
  var HTMLLines = new Array();
  var lineHTML;
  for(r = 0; r < maxR; r++){
   	if (r % 35 == 0) {
 		lineHTML = tableHeader + '<tr>';
 	  } else {
 		lineHTML = '<tr>';
   	}
 	  // the html for the table
	for(c = 0; c < maxC; c++){
		cellStyle = this.types[this.columnIndexes[c]];	
   		lineHTML += '<td nowrap class="' + cellStyle + '">';
		// get the cell data. This is basically equivalent to 
 		// this.rows[r][c] except that:
 		// 1. we want to format the data: formatItem(item, formatName)
 		// 2. we have to look things up via index, bc they might have been moved around
 		cellData = this.formatItem(rows[this.rowIndexes[r]][this.columnIndexes[c]],    this.formats[this.columnIndexes[c]]);
 		lineHTML += cellData;
   	}
   	lineHTML += '</tr>\n';
   	if (r % 35 == 34) lineHTML += '\n</table></div><br><br>\n' + repHeader;
	HTMLLines[r] = lineHTML;
   	repWindow.rowIndex.innerHTML = r + 1;
  } 

  // concatenate the rows of data 
  myHTML += HTMLLines.join(""); 
  var totalsHTML = '<tr>';
  this.calculateColTotals();
  for (i = 0; i < this.colTotals.length; i++) totalsHTML += this.colTotals[this.columnIndexes[i]];
  totalsHTML += '</tr>';
  myHTML += totalsHTML;

  myHTML += '\n</table>';

  // if (repWindow != undefined) repWindow.document.write(myHTML);
  //repWindow.document.write(repHeader);

  //repWindow.document.close();
  repWindow.document.write(myHTML);

  repWindow.tmpmsg.outerHTML = "";
  repWindow.zoomMenuHolder(0).innerHTML = zoomMenu;
  repWindow.document.close();

}

// next function not currently in use
function stopReport() {
  this.reportStop = true; 
}

]]>


<![CDATA[

// Navigation methods
function goNext() {
  this.setStartRow(this.startRow + this.tableRows);
}
function goPrev() {
  this.setStartRow(this.startRow - this.tableRows);
}
function goFirst() {
  this.startRow = 0; this.fillTable();
}
function goLast() {
  this.setStartRow(this.totalRows - this.tableRows);
}

]]>
 

<![CDATA[
function goSubreport(me) {

  if (! this.details.pageURL) return;

  var myURL = this.details.pageURL + "&";
  var myParam = "";
  var myValue = "";
  var colNum = 0;
  var popWinName = "nothing";
  for (i=0; i < this.details.params.length; i++) {
  	myParam = this.details.params[i];

	// We have the name of the col (this is the param name)
	// now we need to get the value of the column that 
	// has this name. In order to do that first we need
	// to know what is the column index for the given col name.
	// So, we loop thru the col name array and find what position
	// this name is at.
	for (colNum = 0; c < this.names.length; colNum++) {
	  if (this.names[colNum] == myParam) break;
	}
	// Now that we've got the col num we can get the value
	// from the data Array. Each row of the table has a "rowIndex" 
	// attribute, and the startRow is the index of the first row
	// (which might not be zero, because the user might have clicked
	// on 'next'). We divide rowIndex by 1 so that Javascript knows 
	// that it is a number and not a string. We use row index to look
	// up the actual rowindex bc the table might have been sorted, meaning
	// that the row index is no longer the same as the data order.
	myValue = this.dataArray[this.rowIndexes[me.rowIndex / 1] + this.startRow][colNum];
	// append the param (i.e. the col name) and value on to the url
	myURL += myParam + '=' + myValue;

	// save the first param value to use in the popup window name. The first
	// value should be some kind of unique id, so that the pop window (used
	// for detail screen) will correspond to that id
	popWinName = myValue;

	if (i < this.details.params.length - 1) myURL += '&';
  } 
  ]]>
  <xsl:choose>
  <xsl:when test="$popUp = 'false'">
  location.href=myURL;
  </xsl:when>
  <xsl:otherwise>

  var popWin = window.open(myURL,popWinName,"height=618,width=934,left=40,top=45,status=no,toolbar=no,menubar=no,location=no,resizable=yes");
  popWin.focus();
  </xsl:otherwise>
  </xsl:choose>
<![CDATA[  
//  window.open("Sample.htm",null,"height=400,width=800,status=yes,toolbar=no,menubar=no,location=no");

}
]]>


<![CDATA[
/** 
 * sortRows: Sort rows based on one column
 * 
 * @me                  the TD element of the colheader that was clicked
 * @colThatWasClicked   On the html table object, the number of the column that the user clicked on.
 *
 */
function sortRows(me, colThatWasClicked) {

  // First we need to figure out which actual data col is in the current html col.
  var colIndex = this.columnIndexes[colThatWasClicked];

  // code to toggle the search direction
  if (colThatWasClicked == this.colThatWasClickedPrev) {
	this.oldSort = this.oldSort * -1;
  } else {
	this.oldSort = 1;
  }
  this.colThatWasClickedPrev = colThatWasClicked;  

  oldSort = this.oldSort;

  // the alphabetic sort
  function charBasedSort(a,b) { 
	if (b[colIndex] < a[colIndex]) return oldSort; 
	if (b[colIndex] > a[colIndex]) return oldSort * -1; 
	if (b[colIndex] == a[colIndex]){
	  return 0;
	}
  }

  // the numeric sort
  function numBasedSort(a, b) { 
	 x = (a[colIndex])/1 - (b[colIndex])/1;  
	 return x * oldSort;
  }  	 

  // Find out what data type that col has
  var colDataType = this.types[colIndex];

  // Now that we know the type, we choose the sort
  switch (colDataType) {
  case 'Text':
  case 'Date':
	this.dataArray.sort(charBasedSort);
	break;
  default:
	this.dataArray.sort(numBasedSort);
  }

  // reset the col header style to that for an unsorted col
  var leftColWidths = new Array();
  var oLeftPane = eval(this.id + 'LeftPaneTable');
  for (c = 0; c < oLeftPane.rows(0).cells.length; c++) {
  //  leftColWidths[c] = oLeftPane.rows(0).cells(c).clientWidth;
	oLeftPane.rows(0).cells(c).className = "colhead";
  }
  var rightColWidths = new Array();
  var oRightPane = eval(this.id);
  for (c = 0; c < oRightPane.rows(0).cells.length; c++) {
   // rightColWidths[c] = oRightPane.rows(0).cells(c).clientWidth;
	oRightPane.rows(0).cells(c).className = "colhead";
  }
  this.fillTable();
  eval(me.id + '.className = "colheadsorted"');

  // Try to highlight col in left pane.
  // If the clicked col has been moved into the left pane, then there will be more
  // than one col with the same id, and the first one will be accessible as id(0).   
  eval ('try{' + me.id + '(0).className="colhead colheadsorted"}catch(e){}finally{}');

  this.restoreMouseDefaults();
// this.setColWidths(leftColWidths,rightColWidths);
// alert('fin');
  return;

}


function setColWidths(leftColWidths, rightColWidths) {

  // right pane
  var oRightPane = eval(this.id);

  for (c = 0; c < oRightPane.rows(0).cells.length; c++) {

	label = colLabel(c + this.nonScrollingColumns.length); 
	label.style.overflow = 'hidden';
	label.style.width = Math.max(rightColWidths[c] - 10, 0);

	// loop thru the NOBR elements in each field in the column
	for (r = 1; r < oRightPane.rows.length; r++) {
	  // get the NOBR element in the cell
	  nobrEL = oRightPane.rows(r).cells(c).firstChild;
	  nobrEL.style.overflow = 'hidden';
	  nobrEL.style.width=Math.max(rightColWidths[c] - 10, 0);
	}  
  }

  // left pane
  var oLeftPane = eval(this.id + "LeftPaneTable"); 
  for (c = 0; c < oLeftPane.rows(0).cells.length; c++) {

	label = colLabel(c); 
	label.style.overflow = 'hidden';
	label.style.width = Math.max(leftColWidths[c] - 10, 0);

	// loop thru the NOBR elements in each field in the column
	for (r = 1; r < oLeftPane.rows.length; r++) {
	  // get the NOBR element in the cell
	  nobrEL = oLeftPane.rows(r).cells(c).firstChild;
	  nobrEL.style.overflow = 'hidden';
	  nobrEL.style.width=Math.max(leftColWidths[c] - 10, 0);
	}  
  }

  // adjust left and right pane widths
  oRightPane.parentElement.style.width = Math.max(this.tableWidth - oLeftPane.clientWidth, 10);


}


// Hey, why isn't this function inside the sort function, since that is only place it will be called
// from? Gee I'm glad you asked that. It's bc this function has to be called in a separate event
// (e.g. onclick) than the soft function, otherwise, the screen doesn't get refreshed with the new
// cursor.
function showHourGlass() {
return;
  var myRules = document.styleSheets[0].rules;
  for (i = 0; i < myRules.length; i++) {
	this.rules[i] = myRules[i].style.cursor;
	myRules[i].style.cursor = 'wait';
  }

}

function restoreMouseDefaults() {
return;
  // Need this line in case showHourGlass wasn't called
  if (this.rules[0] == undefined) return;

  var myRules = document.styleSheets[0].rules;
  for (i = 0; i < myRules.length; i++) {
	 myRules[i].style.cursor = this.rules[i];
  }  

}

]]>


<![CDATA[

/**
 * changeCol: Change which column of data appears in a given colum in the display table.
 *
 * @colIndex    The column in the table that the picklist is in.
 * @titleIndex  The title index that has been chosen to put in that column.
 */

// the "action" parameter is for future functionality
function changeCol(colIndex, titleIndex, action) {

  // which data column was being displayed in this html column?
  var oldIndex = this.columnIndexes[colIndex];

  // find out which html col now contains the data column which is being moved
  // to the chosen col. Put the old data col in that html col.
  for (i = 0; i < this.columnIndexes.length; i++) {
	if (this.columnIndexes[i] == titleIndex) {
	  this.columnIndexes[i] = oldIndex;
	  break;
	}
  }

  // assign the chosen data column to the chosen html column
  this.columnIndexes[colIndex] = titleIndex;

  this.drawEmptyTable();
  this.fillTable();

  this.restoreMouseDefaults();
  return;

}

]]>

<![CDATA[
// Set columns back to same order as beginning (which is the same as in the original data).
function reset() {

  for (i = 0; i < this.dataArray.length; i++) this.rowIndexes[i] = i;
  for (i = 0; i < this.dataArray[1].length; i++) this.columnIndexes[i] = i;
  this.drawEmptyTable();
  this.fillTable();

}
]]>


<![CDATA[

// The following function is under development.
function addSumFunctionByColName(colName, strSumFunction) {

  var colIndex = -1;
  for(c = 0; c < this.columnIndexes.length; c++){  
	if (this.titles[c] == colName) {
	  colIndex = c;
	  break;
	}
  }
  this.sumFunctions[colIndex] = strSumFunction;

}

// for resizing table after window has been resized
function resize () {
  if (this.resized == true) {
	try {
	  oDHTMLTable = eval(this.id);
	  oDHTMLTable.style.display = 'none';
	  this.tableWidth = document.body.clientWidth - 20;

	  // "tableHeader" is temporarily hard coded here til I decide
	  // what to do with it... TODO fix
	  tableHeader.style.width = document.body.clientWidth - 20;

	  oDHTMLTable.style.display = 'block';
	  this.fillTable();
	} catch (e) {
	}
  }
  this.resized = false;

}

function flagResize () {
  // can't seem to get "this.resized" to work so have hard coded the name here...
  dataTable.resized = true;
}


]]>



// End of method definitions, now add each method to object prototype

// Accessor Methods
clsDHTMLTable.prototype.setTableRows = setTableRows;
clsDHTMLTable.prototype.setStartRow = setStartRow;
clsDHTMLTable.prototype.setOrientation = setOrientation;

// draw and fill table
clsDHTMLTable.prototype.drawEmptyTable = drawEmptyTable;
clsDHTMLTable.prototype.fillTable = fillTable;

// misc methods
clsDHTMLTable.prototype.calculateColTotals = calculateColTotals;
clsDHTMLTable.prototype.formatItem = formatItem;
clsDHTMLTable.prototype.highlightRow = highlightRow;
clsDHTMLTable.prototype.changeCol = changeCol;
clsDHTMLTable.prototype.addSumFunctionByColName = addSumFunctionByColName;

// sorting and related methods
clsDHTMLTable.prototype.sortRows = sortRows;
clsDHTMLTable.prototype.reset = reset;
clsDHTMLTable.prototype.showHourGlass = showHourGlass;
clsDHTMLTable.prototype.restoreMouseDefaults = restoreMouseDefaults;
//clsDHTMLTable.prototype.buildSortFunctionBody = buildSortFunctionBody;
clsDHTMLTable.prototype.setColWidths = setColWidths; // used after sorting

// master detail methods
clsDHTMLTable.prototype.toggleRowOpen = toggleRowOpen;
clsDHTMLTable.prototype.closeAll = closeAll;
clsDHTMLTable.prototype.openAll = openAll;

// Navigation methods
clsDHTMLTable.prototype.goNext  = goNext;
clsDHTMLTable.prototype.goPrev  = goPrev;
clsDHTMLTable.prototype.goFirst = goFirst;
clsDHTMLTable.prototype.goLast  = goLast;

// Report and detail screens
clsDHTMLTable.prototype.makeReport  = makeReport;
clsDHTMLTable.prototype.goSubreport = goSubreport;

// get next, prev
clsDHTMLTable.prototype.getNext = getNext;
clsDHTMLTable.prototype.getPrev = getPrev;
clsDHTMLTable.prototype.getCurr = getCurr;

// col resizing
clsDHTMLTable.prototype.TDselMove = TDselMove;
clsDHTMLTable.prototype.TDselUp = TDselUp;
clsDHTMLTable.prototype.TDselDown = TDselDown;

// table resize
clsDHTMLTable.prototype.flagResize = flagResize;
clsDHTMLTable.prototype.resize = resize;


<![CDATA[
/* changeFontSize : Change the font size of an HTML element by changing the doc stylesheet.
 *                  This function will work with any page.
 * 
 * @op : + or -
 * @styleName : e.g. TD or .custom
 */
function changeFontSize(op, styleName) {

  var myRules = document.styleSheets[0].rules;
  var size;
  var lineHeight = "";
  for (i = 0; i < myRules.length; i++) {
	if (myRules[i].selectorText == styleName) {

	  var lineHeight = myRules[i].style.lineHeight;
//	  if (lineHeight != "") {alert(lineHeight)}

	  size = myRules[i].style.fontSize;
	  size = size.replace(/\D/g, "");     // get the numeral (the style will be e.g. "8pt")
	  size = size / 1;                    // i.e. (int) size
	  eval ("size = size " + op + " 1");
	  size = size + "pt";
	  myRules[i].style.fontSize = size; 
	}
  }	
}

// add commas to a numeral 
function commify (myItem) {

  myItem = myItem.toString();

  // add commas
  myItem = myItem.replace(/^(-?\d+)(\d{3})/g, "$1,$2");
  // kludge - the latter command only gets the first comma
  // this gets the second... couldn't get a more Perlish regex to work here.
  myItem = myItem.replace(/^(-?\d+)(\d{3})/g, "$1,$2");
  // this gets the third.. yo, if this was Perl, I wouldn't have to do this... 
  myItem = myItem.replace(/^(-?\d+)(\d{3})/g, "$1,$2");
  // and the fourth...
  myItem = myItem.replace(/^(-?\d+)(\d{3})/g, "$1,$2");
  // did I mention that the above regexes would have been better in Perl?
  //myItem = "$" + myItem;

  return myItem;
}
]]>
 

</script>


</head>


<body onload="init();">  

<xsl:if test="$reportTitle">
  <table style="margin-left:0" width="{$tableWidth - 1}" cellpadding="0" 
	bgcolor="#C9E5E7" border="0" id="tableHeader">
  <tr>
  <td title="{$reportTitle}" class="{$titleFormat}">
  <nobr style="width:340; overflow:hidden">
<xsl:value-of select="$reportTitle"/>
  </nobr>
  </td>
  </tr>
  </table>
</xsl:if>


<xsl:if test="$customization != 'false'">
<div class="dialogCustom1">
  
   &#160; &#160; &#160; &#160; &#160; &#160; &#160; 
   &#160; &#160; &#160; &#160; &#160; &#160; &#160; 
   &#160; &#160; &#160; &#160; &#160; &#160; &#160; 
  <nobr style="overflow:hidden; position:absolute; top:0;">
  <a href="javascript:dataTable.makeReport()">Fast Print Version</a>
   &#160; 
  <a href="javascript:changeFontSize('+', 'TD')">Zoom in</a>
   &#160; 
  <a href="javascript:changeFontSize('-', 'TD')">Zoom out</a>
  </nobr>

  <div id="customDialog" style="display:none">
	<br/><br/><br/><br/><br/>
	<table class="dialogTable" cellpadding="2" cellspacing="2" width="350" >
	  <tr style="background-color:navy">
		<td style="cursor:hand;border:0" align="right" onclick="showCustomDialog()">  
		  <img src="x2.png" border="0"/>
		</td>
	  </tr>
	  
	  
	  <tr class="dialogRow">
	    <td align="center">
	  	<strong>Capitalize: </strong>
	  	<input type="checkbox" value=""
	  	   onclick="dataTable.mixedCase = ! this.checked;dataTable.drawEmptyTable();dataTable.fillTable()"/> 
	    </td>
	  </tr>
	  
	  
	  <tr>    
	    <td class="dialogRow" align="center">
	  	<strong>Show column pick list: </strong>
	  	<input type="checkbox" value="" id="pickListCheckbox" 	 
	    onclick="customDialog.style.display = 'none';dataTable.pickList = this.checked;dataTable.drawEmptyTable();dataTable.fillTable()"/> 
	    </td>
	  </tr>
	  
	  
	  <tr>
	    <td class="dialogRow" align="center">
	    <strong>Orientation: </strong>
	    <input type="radio" checked="true" name="orientation"
	  		 onclick="dataTable.setOrientation('landscape')">View as Row</input>&#160;
	    <input type="radio" name="orientation" 
	  		 onclick="dataTable.setOrientation('portrait')">View as Col</input>
	    </td>
	  </tr>
	  
	  
	  <tr>
	    <td class="dialogRow" align="center">
	  	   <strong>Number of records to show: </strong>
	  	<input style="font-size:10; color:#000000; width:20;" 
	  		 type="text" value="" id="inputNumRows"
	  		 onchange="dataTable.setTableRows(this.value);"/> 
	    </td>
	  </tr>
	  
	  
	  <tr>
	    <td class="dialogRow" style="height:30" align="center">
	  	<button onclick="dataTable.reset()" 
	  			style="font-size:11; font-weight:normal; width:180; background-color:#E9F2F2">Reset Columns to Defaults</button>
	    </td>
	  </tr>
	  
	  
	  <!--
	  <tr>
	    <td class="dialogRow" align='center' style="height:30">
	  	   <table cellspacing="8"><tr><td>
	  	<strong>Non Scrolling</strong><br/>
	  	<select size="{count(//rows/coldef/column)}" onchange="setNonScrollingColumns(this)">
	  	  <xsl:for-each select="/rows/coldef/column">
	  		<option value="{position()}"><xsl:value-of select="normalize-space(heading)"/></option>
	  	  </xsl:for-each>
	  	</select>
	  	</td><td>
	  	<strong>Scrolling</strong><br/>
	  	<select onchange="setScrollingColumns(this)" size="{count(//rows/coldef/column)}">
	  	  <xsl:for-each select="/rows/coldef/column">
	  		<option value="{position()}"><xsl:value-of select="normalize-space(heading)"/></option>
	  	  </xsl:for-each>
	  	</select>		
	  	   </td></tr></table>
	    </td>
	  </tr>
	  -->
	  
	  
	</table>
	
	<script>

	function showCustomDialog() {

	  pickListCheckbox.checked = false;

	  if (customDialog.style.display == 'none') {

		// have to get rid of col pick lists when displaying custom dialog bc
		// otherwise the dropdown menus show thru the dialog
		if (dataTable.pickList) {
	 	  dataTable.pickList = false;
		  dataTable.drawEmptyTable();
		  dataTable.fillTable()	  
		}
		customDialog.style.display = 'block'

	  } else {
		customDialog.style.display = 'none'	
	  }  
	}

	// add or remove a selected column to the left pane
	function setNonScrollingColumn(colIndex) {
	  if (dataTable.nonScrollingColumns[colIndex - 1] == true) {
		dataTable.nonScrollingColumns[colIndex - 1] = false;
	  } else {
		dataTable.nonScrollingColumns[colIndex - 1] = true;
	  }
	  dataTable.drawEmptyTable();
	  dataTable.fillTable();
	}
	</script>
	
  </div>
</div>
</xsl:if>



<div id="tableFrame" onmousemove="selection.empty()">

</div>



<script>

// associative array to hold precalculated col totals
function clsColTotals() {
<xsl:for-each select="//rows/total/value">
  <xsl:if test=". != ''">
  this.<xsl:value-of select="@name"/>='<xsl:value-of select="."/>';</xsl:if>
</xsl:for-each>
}
oColTotals = new clsColTotals();

// associative array to hold the JSP detail page info
function clsDetailJSP() {
  this.pageURL='<xsl:value-of select="normalize-space(//detail-jsp/jsp-name)"/>';
  this.params=[<xsl:for-each select="//detail-jsp/pk">'<xsl:value-of select="normalize-space(.)"/>'<xsl:if test="position() != last()">,</xsl:if></xsl:for-each>];
}
oDetailJSP = new clsDetailJSP();

<!-- field names -->
var fieldNames = new Array(<xsl:text/>
<xsl:for-each select="//coldef/column">
  <xsl:text>"</xsl:text>
  <xsl:value-of select="@name"/>"<xsl:if test="position() != last()">,</xsl:if>
</xsl:for-each>
<xsl:text>);</xsl:text>

<!-- field titles -->
var fieldTitles = new Array(<xsl:text/>
<xsl:for-each select="//coldef/column">
  <xsl:text>"</xsl:text>
  <xsl:value-of select="normalize-space(heading)"/>"<xsl:if test="position() != last()">,</xsl:if>
</xsl:for-each>
<xsl:text>);</xsl:text>

// fix the titles so that they will wrap for a max of two lines
<![CDATA[
for (i = 0; i < fieldTitles.length; i++) {
  // replace all the spaces with nbsp;
  fieldTitles[i] = fieldTitles[i].replace(/ /g, "&nbsp;");
  // now replace the first nbsp with a reg space
  fieldTitles[i] = fieldTitles[i].replace(/&nbsp;/, " ");
}
]]>

<!-- field Types (data types) -->
var fieldTypes = new Array(<xsl:text/>
<xsl:for-each select="//coldef/column">
  <xsl:text>"</xsl:text>
  <xsl:value-of select="normalize-space(type)"/>"<xsl:if test="position() != last()">,</xsl:if>
</xsl:for-each>
<xsl:text>);</xsl:text>

<!-- field Formats (i.e., styles) -->
var fieldFormats = new Array(<xsl:text/>
<xsl:for-each select="//coldef/column">
  <xsl:text>"</xsl:text>
  <xsl:value-of select="normalize-space(format)"/>"<xsl:if test="position() !=  last()">,</xsl:if>
</xsl:for-each>
<xsl:text>);</xsl:text>

</script>


<script>

var rows = new Array();
<xsl:for-each select="//row[position() &lt; $newRowCount + 1]">
rows [<xsl:value-of select="position() - 1"/><xsl:text>] = [</xsl:text>
  <xsl:for-each select="./*">
	<xsl:text>"</xsl:text>
	<!-- get the value, but get rid of embedded quote marks and extra space -->
	<xsl:value-of select="translate(normalize-space(.),'&#x22;', '')"/>
	<xsl:text>"</xsl:text>
	<xsl:if test="position() != last()">,</xsl:if>
  </xsl:for-each>
  <xsl:text>];</xsl:text>  
</xsl:for-each>

</script>


<script>

  // create a new data table
  var dataTable = new clsDHTMLTable(<xsl:value-of select="$newRowCount"/>,0, "DHTMLTable", "dataTable", "tableFrame", rows, fieldNames, fieldTitles, fieldTypes, fieldFormats, null, null, oColTotals, oDetailJSP);

  dataTable.orientation="<xsl:value-of select="$orientation"/>";

  // move as many cols into the left (non scrolling page) as are indicated by the 
  // nonScrollingCols parameter
  if (<xsl:value-of select="$numNonScrollingCols"/> &lt; rows[0].length ) {
	for (i = 0; i &lt;=<xsl:value-of select="$numNonScrollingCols"/>; i++) {
	  dataTable.nonScrollingColumns[i - 1] = true;
	}
  }

  dataTable.drawEmptyTable();
  dataTable.totalRows = <xsl:value-of select="count(//rows/row)"/>;
  dataTable.fillTable(false);

</script>


<script>

<xsl:for-each select="//row[position() &gt; $newRowCount]">
rows [<xsl:value-of select="position() + $newRowCount - 1"/><xsl:text>] = [</xsl:text>
  <xsl:for-each select="./*">
	<xsl:text>"</xsl:text>
	<!-- get the value, but get rid of embedded quote marks and extra space -->
	<xsl:value-of select="translate(normalize-space(.),'&#x22;', '')"/>
	<xsl:text>"</xsl:text>
	<xsl:if test="position() != last()">,</xsl:if>
  </xsl:for-each>
  <xsl:text>];</xsl:text>  
</xsl:for-each>

</script>


<script>

  dataTable = new clsDHTMLTable(<xsl:value-of select="$newRowCount"/>,0, "DHTMLTable", "dataTable", "tableFrame", rows, fieldNames, fieldTitles, fieldTypes, fieldFormats, null, null, oColTotals, oDetailJSP); 

  dataTable.orientation="<xsl:value-of select="$orientation"/>";
  
    // move as many cols into the left (non scrolling page) as are indicated by the 
    // nonScrollingCols parameter
    if (<xsl:value-of select="$numNonScrollingCols"/> &lt; rows[0].length ) {
  	for (i = 0; i &lt;=<xsl:value-of select="$numNonScrollingCols"/>; i++) {
  	  dataTable.nonScrollingColumns[i - 1] = true;
  	}
    }
  
  
    DHTMLTableButtonNext.style.filter = "";
    DHTMLTableButtonLast.style.filter = "";
    if (dataTable.tableRows >= dataTable.totalRows) {
  	DHTMLTableButtonNext.style.filter = "gray alpha(opacity=20)";
  	DHTMLTableButtonLast.style.filter = "gray alpha(opacity=20)";
    }
  

</script>


</body>


</html>

</xsl:template>


</xsl:stylesheet>
