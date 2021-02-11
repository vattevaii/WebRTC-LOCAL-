const input = document.getElementById("message");
const output_box = document.getElementById("message-box");
const hostBtn = document.getElementById("host");
const clientBtn = document.getElementById("client");
const protocolInput = document.getElementById("SDP-input");
const closeBtn = document.getElementById("closeConn");
const SDP2 = document.getElementById("sdps-2");
let host = true;

// sendError(any item) to send the error to modal;

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
  }
};

// output_box.onclick = (e) => e.preventDefault();
//Make this work

hostBtn.onclick = () => {
    host = true;
  clientBtn.setAttribute("noshow", "");
  closeBtn.removeAttribute("noshow");
  protocolInput.parentNode.removeAttribute("noshow");
  protocolInput.setAttribute("placeholder", "Input the client SDP generated");
  // getAllIceAndGenerateBTNStoCopyInsideSDPS
  // Put in SDP2
};
clientBtn.onclick = () => {
    host = false;
  hostBtn.setAttribute("noshow", "");
  closeBtn.removeAttribute("noshow");
  protocolInput.parentNode.removeAttribute("noshow");
  protocolInput.setAttribute(
    "placeholder",
    "Input the host SDP for connection"
  );
};
closeBtn.onclick = () => {
  hostBtn.removeAttribute("noshow");
  clientBtn.removeAttribute("noshow");
  closeBtn.setAttribute("noshow", "");
  protocolInput.parentNode.setAttribute("noshow", "");
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
