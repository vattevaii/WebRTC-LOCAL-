// Variables
let lc; //LocalConnection
let dc; //Data Channel through which data transfers

function initHost() {
  //RemoteConnection
  // RTCPeerConnection(servers);
  // Locally run so no servers
  lc = new RTCPeerConnection();
  // console Created local peer conn. obj WHATEVER
  dc = lc.createDataChannel("passMessage");
  // This needs to be broadcast
  dc.onmessage = (e) => {
      //Place the data coming into html
      console.log(e.data);
  }
  dc.onopen = (e) => {
    //Something for when data Channel is fully open
    declaration("Data Channel is officially open");
    //EG.
    enableSending();
  };
  dc.onclose = (e) => {
    //Lament or cry or whatever
    // Note: client or host both may close conn.
    //I don't know how to reconnect.
    // So total destruction of all items and restart
    disableSending();
    declaration("Closed Data channel");
  };

  lc.onicecandidate = (event) => {
    //ICE candidate found event
    if (event.candidate) {
      //send to peer via signalling mechanism
      //For now copy and paste in browser
      //This candidate is then set as remote description
      //Or the candidates are added to AddIceCandidates;
      
      //Khai sale k chai pathaunu parne ho
      //showOnConfigBox(event.candidate);
    } else {
      //No candidate.. Yo want me to dance??
      //All are gone to the other side
    }
  };
  lc.createOffer().then((e) => {
      lc.setLocalDescription(e);
      showOnConfigBox(e);
      declaration("Offer Sent");
  });
}
let remoteConnHost = (val) => {
    lc.setRemoteDescription(JSON.parse(val));
    declaration("Answer received!");
};
//DataChannel
// let dc;
// let sendChannel;
// let receiveChannel;
// const host = document.getElementById("host");
let closeHost2 = () =>{
    dc.close();
    lc.close();
    lc=null;
    declaration("Closed Data and Local RTC");
}