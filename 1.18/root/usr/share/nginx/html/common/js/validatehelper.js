function validatePhone(phone,required){

	if(arguments.length>1){ //required field
		if(phone.value.length==0){
//			alert("Phone Number is required");
			window.status=("Phone Number is required");
			phone.select();
			phone.focus();
			return true;
		}
	}

	var re=/^\(\d{3}\) \d{3}-\d{4}$/;
	if(!re.test(phone.value)){
//	alert("Phone Number must in in the format (999) 999-9999");
	window.status=("Phone Number must in in the format (999) 999-9999");
		phone.select();
		phone.focus();
	}
	return true;
}

function validateDate(date){

	if(arguments.length>1){ //required field

		if(date.value.length==0){
//			alert("Date is required");
			date.select();
			date.focus();
			return true;
		}
	}

	if(date.value.length==8){
		var re1=/^\d{2}\/\d{2}\/\d{2}$/;
		if(!re1.test(date.value)){
//			alert("Date must in in the format MM/DD/YYYY or MM/DD/YY");
			date.select();
			date.focus();
			return false;
		}
		//prepend 20 to year

		date.value=date.value.substr(0,6)+"20"+date.value.substr(6,2);

	}

	var re2=/^\d{2}\/\d{2}\/\d{4}$/;
	if(!re2.test(date.value)){
//		alert("Date must in in the format MM/DD/YYYY or MM/DD/YY");
		date.select();
		date.focus();
		return false;
	}

	//do range check here
	if(!isDate(date.value,"MM/dd/yyyy")){
//		alert(date.value + " is not a valid Date");
		date.select();
		date.focus();
	}

	return true;
}

function validateTime(time,required){

	if(arguments.length>1){ //required field

		if(time.value.length==0){
//			alert("Time is required");
			time.select();
			time.focus();
			return true;
		}
	}
	var re=/^\d{2}:\d{2}:\d{2}$/;
	if(!re.test(time.value)){
//		alert("Time must in in the format HH:MM:SS");
		time.select();
		time.focus();
		return false;
	}
	//do range check here
	if(!isDate(time.value,"kk:mm:ss")){
//		alert(time.value + " is not a valid Time");
		time.select();
		time.focus();
		return false;
	}

	return true;
}
