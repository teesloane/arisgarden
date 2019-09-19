function timeStringtoSeconds(str) {
		var a = str.split(':');
		return (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
}
