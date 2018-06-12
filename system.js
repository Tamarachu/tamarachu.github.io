var ord = function(string){
	var str = string + '';
	var code = str.charCodeAt(0);

	if (code >= 0xD800 && code <= 0xDBFF) {
		var hi = code;
		if (str.length === 1)
			return code;
		var low = str.charCodeAt(1);
		return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
	}
	if (code >= 0xDC00 && code <= 0xDFFF)
		return code;

	return code;
}

var char_lang = function(str){
	let charcode = ord(str);
	if ((ord('א') <= charcode && charcode <= ord('ת')) || (ord('؀') <= charcode && charcode <= ord('ۿ')))
		return "rtl";
	if ((ord('0') <= charcode && charcode <= ord('9')) || (ord('a') <= charcode && charcode <= ord('z')) || (ord('A') <= charcode && charcode <= ord('Z')))
		return "ltr";
	return "";
}

var reverse = function(element){
	let temp = "";
	let parts = [];
	let neutralChars = "";
	let endChars = "";
	let chartype = "rtl";
	let prevchartype = "rtl";
	
	for (const character of element.value.split(''))
	{
		chartype = char_lang(character);
		
		if (chartype == "")
			neutralChars += character;
		else
			if (chartype == prevchartype)
			{
				if (neutralChars.length > 0)
				{
					temp += neutralChars;
					neutralChars = "";
				}
				temp += character;
			}
			else
			{
				if (endChars.length > 0)
				{				
					temp += endChars;
					endChars = "";
				}
				endChars = neutralChars;
				neutralChars = "";
				parts.push(temp);
				temp = "";
				temp += character;
				prevchartype = chartype;
			}
	}	
	temp = neutralChars + temp + endChars;
	parts.push(temp);
	parts.reverse();
	
	document.getElementById("result").innerHTML = parts.join("");
}

var copyToClipboard = function(){
	const el = document.createElement('textarea');
	el.value = document.getElementById("result").innerHTML;
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
};
