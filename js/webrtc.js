var localConnection;
var datachannel;

function toHost(data) {
    addRemoteDesc(data);
}

function Hosting() {
    const server = null;
    localConnection = new RTCPeerConnection(server);
    datachannel = localConnection.createDataChannel("newDataChannel");
    localConnection.onicecandidate = e => {
        //Send to Peer Manually??
        //Better option do not send local SDP first send agter you find candidates
        //Since iceCandidates get added to localdescriptioption anyways;
        onIceCandidate(e);
    };
    datachannel.onopen = onDataChannelStateChange;
    datachannel.onerror = onDataChannelStateChange;
    datachannel.onclose = onDataChannelStateChange;
    datachannel.onmessage = (e) => addToData(`Message: ${e.data}`);

    localConnection.createOffer().then(
        sendDescriptionToPeer,
        SessionError
    );
}


function onIceCandidate(e) {
    addToSDP(JSON.stringify(e.candidate));
    addToSDP(JSON.stringify(localConnection.localDescription))
}

function addICECandidateToPeer(d) {
    localConnection.addIceCandidate(JSON.parse(d));
    addToData("New Ice Candidate")
}

function addRemoteDesc(desc) {
    console.log(desc);
    desc = JSON.parse(desc);
    localConnection.setRemoteDescription(desc);
    addToData("Remote Description Added");
}

function Clienting(given) {
    const server = null;
    localConnection = new RTCPeerConnection(server);
    addRemoteDesc(given);
    localConnection.onicecandidate = e => {
        onIceCandidate(e);
    };
    localConnection.ondatachannel = e => {
        datachannel = e.channel;
        datachannel.onopen = onDataChannelStateChange;
        datachannel.onclose = onDataChannelStateChange;
        datachannel.onerror = onDataChannelStateChange;
        datachannel.onmessage = (e) => addToData(`Message: ${e.data}`);
    };
    localConnection.createAnswer().then(
        sendDescriptionToPeer,
        SessionError
    );
}

function onDataChannelStateChange(e) {
    addToData(`The data channel is ${datachannel.readyState}`);
    if (datachannel.readyState == "open") EnableCommunication();
    else if (datachannel.readyState == "closed") {
        DisableCommunication();
        closeConnections();
    }
}

function closeConnection() {
    if (typeof datachannel != undefined) datachannel.close();
    localConnection.close();
}

var sendDescriptionToPeer = e => {
    localConnection.setLocalDescription(e);
    addToSDP(JSON.stringify(e));
    addToSDP("Below Comes the Ice Candidates :");
    addToData("Local Description Added");
    addToData("SDP sent");
}

var SessionError = e => {
    showError(e);
}