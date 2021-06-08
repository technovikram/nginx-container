function callLoader(){
	$("body,html").css('overflow', 'hidden');
	$('.block-overlay').css('display', 'block');
	$('.loader').css('display', 'block');
}	
	
//Change input object in sentence case i.e. if all letters are input in small case, capitalize each word
function changeSentenceCase(obj) {
	   var str = obj.value;
	   var result=false;
	   for(var i=0;i<str.length;i++){
		   if(str[i] === str[i].toUpperCase() && str[i] !== str[i].toLowerCase()){
				   result=true;
				   return;
			   }
		   }
	   var splitStr = str.toLowerCase().split(' ');
	   for (var i = 0; i < splitStr.length; i++) {
	           splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
	   }
	   $(obj).val(splitStr.join(' '));
}


function setScrollableTableSelection(num, hiddenVarName){
	
	var scrlblTblName = hiddenVarName.substring(0, hiddenVarName.length-14);
	tblID	=	document.getElementById(scrlblTblName+"_tblResults");
	theEle=document.getElementById(hiddenVarName);
    currentRow = theEle.value;
	
    theEle.value = num;
	
	num = num%10;
	if(tblID.tBodies[0].rows[num] != null){
		tblID.tBodies[0].rows[num].className='rowhover';
	}
}



