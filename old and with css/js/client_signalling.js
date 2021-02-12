const rc = new RTCPeerConnection(); //RemoteConn
rc.ice = false;

rc.ondatachannel = (e) => {
  rc.dc = e.channel;  //RemoteConn DataChannel
  rc.dc.onmessage = (e) => console.log("New Message : " + e.data);
  rc.dc.onopen = (e) => console.log("Connection open in Client!!!!!!!");
  rc.dc.onclose = (e) => {
    console.log("Connection closed :( " + e);
    closeClient();
  }
};

rc.onicecandidate = (e) => {
  // console.log(
  //   "New Ice Candidate!! Reprinting SDP! " + JSON.stringify(rc.localDescription)
  // );
  rc.ice = true;
  showonDoc(JSON.stringify(rc.localDescription));
};
var clientSide = function (SDP) {
  rc.setRemoteDescription(SDP).then((a) => console.log("Offer Set!!"));
  var ice = rc
    .createAnswer()
    .then((a) => rc.setLocalDescription(a))
    .then((a) => console.log("Answer Created !! "));
  console.log("MY ICE" + ice);
};

