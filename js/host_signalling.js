const lc = new RTCPeerConnection(); //LocalConn
const dc = lc.createDataChannel("channel"); //DataChannel
lc.ice=false;

dc.onmessage = (e) => console.log("Message Received : " + e.data);

lc.onicecandidate = (e) => {
  // console.log(
  //   "New Ice Candidate!! Reprinting SDP! " + JSON.stringify(lc.localDescription)
  // );
  showonDoc(JSON.stringify(lc.localDescription));
  lc.ice= true;
};

dc.onopen = (e) => console.log("Connection opened ! ");
dc.onclose = (e) => {
  console.log("Connection closed :( " + e);
  closeHost();
}

var hostSide = function () {
  lc.createOffer()
    .then((o) => lc.setLocalDescription(o))
    .then((a) => console.log("Set Successfully!"));
};

var connToClient = function () {
  var SDP = document.getElementById("SDP");
  if (SDP.value == "") {
    SDP.setAttribute("class", "empty");
    console.log("ERROR");
    return;
  }
  console.log("SUCCESS");
  SDP.setAttribute("class", "");
  lc.setRemoteDescription(JSON.parse(SDP.value));
};
