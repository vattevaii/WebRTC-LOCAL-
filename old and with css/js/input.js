const constraints = {
  video: true,
  audio: false,
};

var obtainMediaAccess = function () {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      console.log("Stream obtained\n Stream : ", stream);
      showVideo(stream);
      openSuccess();
    })
    .catch((err) => {
      console.log("Error in obtaining stream : ", err);
      openDefeat();
    });
};  // FOR CAMERA

// const constraints={
//     video:{
//         cursor: "motion", // motion|always|never
//         displaySurface: "application"//'application'|'browser'|'monitor'|'window'
//     }
// }

// var obtainMediaAccess = () => {
//     navigator.mediaDevices.getDisplayMedia(constraints).then((stream) => {
//     console.log("Stream obtained\n Stream : ", stream);
//       showVideo(stream);
//       openSuccess();
//     })
//     .catch((err) => {
//       console.log("Error in obtaining stream : ", err);
//       openDefeat();
//     });
// }

var doFirst = () => {
    obtainMediaAccess();
};
var showVideo = (stream) => {
    if(stream == null || undefined) obtainMediaAccess();
  var videoElement = document.getElementById("localVideo");
  console.log(videoElement);
  videoElement.srcObject = stream;
};

window.addEventListener("load", doFirst());
