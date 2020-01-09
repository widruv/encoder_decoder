function b64EncodeUnicode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }));
}

function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

function ascii_to_hexa(str)
{
	var arr1 = [];
	for (var n = 0, l = str.length; n < l; n ++) 
	{
		var hex = Number(str.charCodeAt(n)).toString(16);
		arr1.push(hex);
	}
	return arr1.join('');
}

function hex2a(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

function encode() {
    var target = document.getElementById("target");
    var select = document.getElementById("type_select");
    var type = select.options[select.selectedIndex].value; 

    if (type == "url") {
        target.value = encodeURIComponent(target.value);
    }
	else if (type == "base64") {
        target.value = b64EncodeUnicode(target.value);
	}
    else if (type == "hex") {
        target.value = ascii_to_hexa(target.value);
    }

}

function decode() {
    var target = document.getElementById("target");
    var select = document.getElementById("type_select");
    var type = select.options[select.selectedIndex].value; 

    if (type == "url") {
        target.value = decodeURIComponent(target.value);
    }
    else if (type == "base64") {
        target.value = b64DecodeUnicode(target.value);
	}
    else if (type == "hex") {
        target.value = hex2a(target.value);
    }
}


document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('encode').addEventListener('click',function(){
	    encode();
	},false);
	document.getElementById('decode').addEventListener('click',function(){
	    decode();
	},false);
});


