var screenStartEl = document.querySelector("#screenStart");
var screenWebcamEl = document.querySelector("#screenWebcam");
var screenNameEl = document.querySelector("#screenName");
var screenPrintEl = document.querySelector("#screenPrint");

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

var navSnap = function () {
	//TODO: capture an image and compress

	//hide webcamscreen
	screenWebcamEl.classList.toggle('hidden');

	//show namescreen
	screenNameEl.classList.toggle('hidden');
	//init MDC
	window.mdc.autoInit(screenNameEl);
	
	//show keyboard
	$('#keybard').keyboard({
		display: {
			'meta1' : '한/영',
			'bksp' : '\u2190'
		},
		layout: "custom",
		customLayout: {
			'normal': [
				'ㅂ ㅈ ㄷ ㄱ ㅅ ㅛ ㅕ ㅑ ㅐ ㅔ {bksp}',
				'ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ',
				'{shift} ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ {meta1}'
			],
			'shift': [
				'ㅃ ㅉ ㄸ ㄲ ㅆ ㅛ ㅕ ㅑ ㅒ ㅖ {bksp}',
				'ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ',
				'{shift} ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ {meta1}'
			],
			'meta1': [
				'Q W E R T Y U I O P {bksp}',
				'A S D F G H J K K L',
				'Z X C V B N M {meta1}'
			]
		}
	})
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