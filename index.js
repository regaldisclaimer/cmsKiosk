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
};

var navSnap = function () {
	//TODO: capture an image and compress

	//hide webcamscreen
	screenWebcamEl.classList.toggle('hidden');

	//show namescreen
	screenNameEl.classList.toggle('hidden');

	//TODO: show keyboard
};

var navSubmit = function () {
	
	//TODO: grab name

	//hide namescreen
	screenNameEl.classList.toggle('hidden');
	//show print screen
	screenPrintEl.classList.toggle('hidden');
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
};
