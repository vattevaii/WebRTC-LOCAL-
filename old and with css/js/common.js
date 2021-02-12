const input = document.getElementById("message");
const output_box = document.getElementById("message-box");
const hostBtn = document.getElementById("host");
const clientBtn = document.getElementById("client");
const protocolInput = document.getElementById("SDP-input");
const closeBtn = document.getElementById("closeConn");
const SDP2 = document.getElementById("sdps-2");
let isThisHost = true;

// declaration(any item) to send the error to modal;

input.onkeypress = (e) => {
  if (e.keyCode === 13) {
    // e.preventDefault(); //if needed
    //Submit the answer to the malik;
    // if(host) sendMessageToClient(input.value);
    // else sendMessageToHost(input.value);
  }
};

protocolInput.onkeypress = (e) => {
  if (e.keyCode === 13) {
    // e.preventDefault(); //if needed
    //Submit the SDP to whoever active (host or client);
    // if(host) goSomewhereInHost(SDP2.value);//sdpFromClient
    // else goSomeWhereInClient(SDP2.value);
    if(isThisHost) remoteConnHost(protocolInput.value);
    else remoteConnClient(protocolInput.value);
  }
};

// output_box.onclick = (e) => e.preventDefault();
//Make this work

hostBtn.onclick = () => {
  isThisHost = true;
  clientBtn.setAttribute("noshow", "");
  closeBtn.removeAttribute("noshow");
  protocolInput.parentNode.removeAttribute("noshow");
  protocolInput.setAttribute("placeholder", "Input the client SDP generated");
  // getAllIceAndGenerateBTNStoCopyInsideSDPS
  // Put in SDP2
  initHost();
};

clientBtn.onclick = () => {
    isThisHost = false;
  hostBtn.setAttribute("noshow", "");
  closeBtn.removeAttribute("noshow");
  protocolInput.parentNode.removeAttribute("noshow");
  protocolInput.setAttribute(
    "placeholder",
    "Input the host SDP for connection"
  );
  initClient();
};

closeBtn.onclick = () => {
  hostBtn.removeAttribute("noshow");
  clientBtn.removeAttribute("noshow");
  closeBtn.setAttribute("noshow", "");
  protocolInput.parentNode.setAttribute("noshow", "");
    if(isThisHost) closeHost2();
    else closeClient2();
};

let disableSending = () => {
    input.setAttribute("disabled", "");
    output_box.setAttribute("diss", "");
}
disableSending();

let enableSending = () => {
    input.removeAttribute("disabled");
    output_box.removeAttribute("diss");
}

let showOnConfigBox = (str) => {
     // console.log("I'm here(showonDoc)");
  var news = document.createElement("span");
  news.setAttribute("onclick", "copyJSON(this)");
  news.innerText = JSON.stringify(str);
  SDP2.appendChild(news);
}
declaration("No Please No");