let cl = document.getElementById("cl");
let ho = document.getElementById("ho");
let vidBtn = document.getElementById("video");
let message = document.getElementById("Msg");
let ice = document.getElementsByClassName("ice")[0];
let data = document.getElementsByClassName("data")[0];
let SDP = document.getElementsByClassName("SDP")[0];
let error = document.getElementsByClassName("error")[0];
let inputHost = document.getElementsByClassName("ho")[0];
let inputClient = document.getElementsByClassName("cl")[0];
let video = document.getElementsByClassName("vid")[0];

inputHost.disabled = true;
inputClient.disabled = true;
ice.disabled = true;
EnableHost = () => inputHost.disabled = false;
EnableClient = () => inputClient.disabled = false;
EnableIce = () => ice.disabled = false;
DisableHost = () => inputHost.disabled = true;
DisableClient = () => inputClient.disabled = true;
DisableIce = () => ice.disabled = true;
EnableCommunication = () => {
    vidBtn.disabled = false;
    message.disabled = false;
}
DisableCommunication = () => {
        vidBtn.disabled = true;
        message.disabled = true;
    }
    //Host btn clicked ClientSDP textarea enable
cl.onclick = (e) => {
    // Hosting();
    EnableHost();
    DisableClient();
};
ho.onclick = (e) => {
    Hosting();
    DisableHost();
    EnableClient();
};

ice.onkeypress = (e) => {
    if (e.keyCode == 13) {
        console.log("Key Pressed : Enter");
        addICECandidateToPeer(inputHost.value);
    }
}
inputHost.onkeypress = (e) => {
    if (e.keyCode == 13) {
        console.log("Key Pressed : Enter");
        Clienting(inputHost.value);
        EnableIce();
    }
}
inputClient.onkeypress = (e) => {
    if (e.keyCode == 13) {
        console.log("Key Pressed : Enter");
        toHost(inputClient.value);
        EnableIce();
    }
}
message.onkeypress = (e) => {
    if (e.keyCode == 13) {
        let msg = message.value;
        message.value = '';
        addToData(msg);
        datachannel.send(msg)
    }
}
vidBtn.onclick = (e) => {
    //Access Video on device and send to data channel
    let msg = "Look!!!! There should be a video coming.. There isn't?? Oh forget about it";
    addToData(msg);
    datachannel.send(msg)
}
var copyJSON = function(el) {
    var range = document.createRange();
    // console.log("I'm here : " + el.innerHTML);
    range.selectNode(el);
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges(); // to deselect
};
var addToData = (e) => {
    let newDiv = document.createElement("div");
    newDiv.setAttribute("onclick", "copyJSON(this)");
    newDiv.innerText = e;
    data.appendChild(newDiv);
}
var addToSDP = (e) => {
    let newDiv = document.createElement("div");
    newDiv.setAttribute("onclick", "copyJSON(this)");
    newDiv.innerText = e;
    SDP.appendChild(newDiv);
}