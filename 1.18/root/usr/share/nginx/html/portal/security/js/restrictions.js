function verifyPage() {
	if (!isTime(document.all.startTime.value, "Start Time")) {
		document.all.startTime.select();
		document.all.startTime.focus();
		return false;
	}

	if (!isTime(document.all.endTime.value, "End Time")) {
		document.all.endTime.select();
		document.all.endTime.focus();
		return false;
	} 

	if (!isStartTimeLessThenEndTime(document.all.startTime.value, document.all.endTime.value)) {
		alert("Start time must be equal or less than end time.");
		return false;
	}

	return true;
}

