var screenStartEl = document.querySelector("#screenStart");
var screenWebcamEl = document.querySelector("#screenWebcam");
var screenNameEl = document.querySelector("#screenName");
var screenPrintEl = document.querySelector("#screenPrint");

//check webcam
if (!!(
		navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia
	)) {
} else {
	alert('Webcam Not supported in this browser');
}

var navBegin = function() {
	//hide start screen
	screenStartEl.classList.toggle('hidden');
	//get webcam
	//chrome won't allow unless served over https
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
	navigator.getUserMedia({video: true}, function(localMediaStream) {
		var video = document.querySelector('video');
		video.src = window.URL.createObjectURL(localMediaStream);

		video.onloadedmetadata = function(e) {
			//ready to go. do some stuff.
		};
	}, function(e) {
		alert("Webcam Error: ", e);
	});
	//turn on webcam screen
	screenWebcamEl.classList.toggle('hidden');
};

var navSnap = function() {

};

var navSubmit = function() {

};

var navPrint = function() {

};

var navEnd = function() {

};

