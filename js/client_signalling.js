// Variables
let rc; //RemoteConnection

function initClient() {
  
  // RTCPeerConnection(servers) anyways same as lc;
  // Locally run so no servers
  rc = new RTCPeerConnection();
  // console Created remote peer conn. WHATEVER

  rc.onicecandidate = (event) => {
    if (event.candidate) {
      //send to host
    } else {
      //No candidate.. Yo want me to dance??
    }
  };

  rc.ondatachannel = (event) => {
    // if other party ANYONE creates dataChannel
    event.channel.onopen = () => {
      //Data channel fully opened and ready for exchange
    };
  };
}
//DataChannel
rc.dc = "";
let sendChannel;
let receiveChannel;
