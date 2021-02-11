const constraints = {
  video: false,
  audio: true,
};

var obtainMediaAccess = function () {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      console.log("Stream obtained\n Stream : ", stream);
      openSuccess();
    })
    .catch((err) => {
      console.log("Error in obtaining stream : ", err);
      openDefeat();
    });
};

// obtainMediaAccess();
function getConnectedDevices(type, callback) {
    navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            const filtered = devices.filter(device => device.kind === type);
            callback(filtered);
        });
}

getConnectedDevices('videoinput', cameras => console.log('Cameras found', cameras));
getConnectedDevices('audiooutput', adevices => console.log('Audio found', adevices)); 
//shows 0 WbRTC deals with only input???

// navigator.mediaDevices.enumerateDevices().then(device => {
//     console.log(device);
// })

