var screenStartEl = document.querySelector("#screenStart");
var screenWebcamEl = document.querySelector("#screenWebcam");
var screenNameEl = document.querySelector("#screenName");
var screenPrintEl = document.querySelector("#screenPrint");

var inputBufferEl = document.querySelector("#nameInput");
var inputViewEl = document.querySelector("#nameDisplay");

var inputBuffer = "";

//check webcam
if (!!(
		navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia
	)) {} else {
	alert('Webcam Not supported in this browser');
}

var navBegin = function () {
	//hide start screen
	screenStartEl.classList.toggle('hidden');
	//get webcam
	//chrome won't allow unless served over https
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
	navigator.getUserMedia({
		video: true
	}, function (localMediaStream) {
		var video = document.querySelector('video');
		video.src = window.URL.createObjectURL(localMediaStream);

		video.onloadedmetadata = function (e) {
			//ready to go. do some stuff.
		};
	}, function (e) {
		alert("Webcam Error: ", e);
	});
	//turn on webcam screen
	screenWebcamEl.classList.toggle('hidden');
	//init MDC
	window.mdc.autoInit(screenWebcamEl);
};

var processKeystroke = function() {
	//clear the output
	inputViewEl.value = "";	
	//reset the hangul toggle
	var hangul_toggle = true;
	//clear the engine's internal buffer
	nabi_ic_buf_clear();
	//get input value to the input buffer
	inputBuffer = inputBufferEl.value + " ";
	//convert with the engine
	for(var i = 0; i < inputBuffer.length; i++) {
		var thisChar = inputBuffer.charAt(i);
		if (thisChar == "\r") {
			//according to the doc: ignore '\r', already is an '\n'
		} else if (thisChar == "`") {
			hangul_toggle = !hangul_toggle;
		} else {
			if (hangul_toggle) {
				nabi_automata_2(thisChar);
			} else {
				inputViewEl.value = inputViewEl.value + thisChar;
			}
		}
	}
};

var user_commit = function(buf) {
	console.log(buf);
	if (buf[0] != 0 && buf[0]) {
		inputViewEl.value += String.fromCharCode(buf[0]);
	}
};

var user_commit_keyval = function(keyval) {
};

var user_preedit_insert = function(buf) {

};

var user_preedit_update = function(buf) {

};

var setupKeyboard = function() {
	$.keyboard.keyaction['customq'] = 'q';
	$.keyboard.keyaction['customw'] = 'w';
	$.keyboard.keyaction['custome'] = 'e';
	$.keyboard.keyaction['customr'] = 'r';
	$.keyboard.keyaction['customt'] = 't';
	$.keyboard.keyaction['customy'] = 'y';
	$.keyboard.keyaction['customu'] = 'u';
	$.keyboard.keyaction['customi'] = 'i';
	$.keyboard.keyaction['customo'] = 'o';
	$.keyboard.keyaction['customp'] = 'p';
	$.keyboard.keyaction['customa'] = 'a';
	$.keyboard.keyaction['customs'] = 's';
	$.keyboard.keyaction['customd'] = 'd';
	$.keyboard.keyaction['customf'] = 'f';
	$.keyboard.keyaction['customg'] = 'g';
	$.keyboard.keyaction['customh'] = 'h';
	$.keyboard.keyaction['customj'] = 'j';
	$.keyboard.keyaction['customk'] = 'k';
	$.keyboard.keyaction['customl'] = 'l';
	$.keyboard.keyaction['customz'] = 'z';
	$.keyboard.keyaction['customx'] = 'x';
	$.keyboard.keyaction['customc'] = 'c';
	$.keyboard.keyaction['customv'] = 'v';
	$.keyboard.keyaction['customb'] = 'b';
	$.keyboard.keyaction['customn'] = 'n';
	$.keyboard.keyaction['customm'] = 'm';
	$.keyboard.keyaction['customQ'] = 'Q';
	$.keyboard.keyaction['customW'] = 'W';
	$.keyboard.keyaction['customE'] = 'E';
	$.keyboard.keyaction['customR'] = 'R';
	$.keyboard.keyaction['customT'] = 'T';
	$.keyboard.keyaction['customO'] = 'O';
	$.keyboard.keyaction['customP'] = 'P';
	//custom key pattern from
	//https://github.com/Mottie/Keyboard/issues/555
	$('#nameInput').keyboard({
		display: {
			'bksp': '\u2190',
			'shift': '\u21E7 Shift',
			'accept': '확인/다음',
			'customq': 'ㅂ', 'customw': 'ㅈ', 'custome': 'ㄷ', 'customr': 'ㄱ', 'customt': 'ㅅ', 'customy': 'ㅛ', 'customu': 'ㅕ', 'customi': 'ㅑ', 'customo': 'ㅐ', 'customp': 'ㅔ',
			'customa': 'ㅁ', 'customs': 'ㄴ', 'customd': 'ㅇ', 'customf': 'ㄹ', 'customg': 'ㅎ', 'customh': 'ㅗ', 'customj': 'ㅓ', 'customk': 'ㅏ', 'customl': 'ㅣ',
			'customz': 'ㅋ', 'customx': 'ㅌ', 'customc': 'ㅊ', 'customv': 'ㅍ', 'customb': 'ㅠ', 'customn': 'ㅜ', 'customm': 'ㅡ',
			'customQ': 'ㅃ', 'customW': 'ㅉ', 'customE': 'ㄸ', 'customR': 'ㄲ', 'customT': 'ㅆ', 'customO': 'ㅒ', 'customP': 'ㅖ',
		},
		layout: "custom",
		customLayout: {
			'default': [
				'{customq} {customw} {custome} {customr} {customt} {customy} {customu} {customi} {customo} {customp} {bksp}',
				'{customa} {customs} {customd} {customf} {customg} {customh} {customj} {customk} {customl} {shift}',
				'{customz} {customx} {customc} {customv} {customb} {customn} {customm} {accept}',
			],
			'shift': [
				'{customQ} {customW} {customE} {customR} {customT} {customy} {customu} {customi} {customO} {customP} {bksp}',
				'{customa} {customs} {customd} {customf} {customg} {customh} {customj} {customk} {customl} {shift}',
				'{customz} {customx} {customc} {customv} {customb} {customn} {customm} {accept}',
			],
		},
		usePreview: false,
		alwaysOpen: true,
		stayOpen: true,
		accepted: function() {
			//TODO: clear both buffers
			navSubmit();
		},
		change: function() {
			processKeystroke();
		},
	});
};

var navSnap = function () {
	//TODO: capture an image and compress

	//hide webcamscreen
	screenWebcamEl.classList.toggle('hidden');

	//show namescreen
	screenNameEl.classList.toggle('hidden');
	//init MDC
	window.mdc.autoInit(screenNameEl);
	
	//setup keyboard
	setupKeyboard();

};

var navSubmit = function () {
	
	//TODO: grab name

	//hide namescreen
	screenNameEl.classList.toggle('hidden');
	//show print screen
	screenPrintEl.classList.toggle('hidden');
	//init MDC
	window.mdc.autoInit(screenPrintEl);
	//TODO: populate fields
};

var navPrint = function () {

	//TODO: temporarily disable print button
	
	//TODO: show wait/todo button

	//TODO: submit info to the cloud

	//TODO: print with QR if cloud response receieved

	//TODO: print with internet error message if cloud response not received


};

var navEnd = function () {

	//TODO: reset
	//NB: consider implementing a bool check to see if MDC needs initiating

};

//init MDC JS on the starting page
window.mdc.autoInit(screenStartEl);
