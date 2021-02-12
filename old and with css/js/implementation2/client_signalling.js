// Variables
let rc; //RemoteConnection
let rdc; //Data channel for remote connection;

function initClient() {
  // RTCPeerConnection(servers) anyways same as lc;
  // Locally run so no servers
  rc = new RTCPeerConnection();
  // console Created remote peer conn. WHATEVER

  rc.onicecandidate = (event) => {
    if (event.candidate) {
      //send to host
      //SEE DESCRIPTION IN HOST_SIGNALLING
      //showOnConfigBox(event.candidate);
    } else {
      //No candidate.. Yo want me to dance??
    }
  };

  rc.ondatachannel = (event) => {
    // if other party ANYONE creates dataChannel
    // This is found only
    rdc = event.channel;
    rdc.onopen = (e) => {
        enableSending();
        declaration("Hey, You can message officially now!!!");
    };
    rdc.onclose = (e) => {
        disableSending();
        declaration("Fuck, where did it go wrong or did you close it??");
    };
    rdc.onmessage = (e) => {
        console.log(e.data);
        //when message is received put in document
    }
    //Below is tha official code but we want simplicity
    /*event.channel.onopen = (e) => {
      declaration("Data Channel is officially open");
      rdc = e.channel;
      //Data channel fully opened and ready for exchange
      enableSending();
    };*/
  };
}
let remoteConnClient = (val) => {
  rc.setRemoteDescription(JSON.parse(val));
  rc.createAnswer().then((val) => {
    rc.setLocalDescription(val);
    showOnConfigBox(val);
  });
  declaration("Answer sent!");
};
//DataChannel
// rc.dc = "";
// let sendChannel;
// let receiveChannel;
let closeClient2 = () => {
    rdc.close();
    rc.close();
    rc = null;
    declaration("Closed Data and Local RTC");
}