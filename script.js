var openSuccess = function () {
  var modals = document.getElementById("modal");
  modals.innerHTML = `<div class="modal">
                          <div>Success in obtaining Media</div>
                      </div>`;
  setStatus(1);
  openModal();
};

var openDefeat = function () {
  var modals = document.getElementById("modal");
  modals.innerHTML = `<div class="modal">
                          <div>Error in obtaining Media<br \>Reopen the page manually.</div>
                      </div>`;
  setStatus(0);
  openModal();
};

var openModal = function () {
  var modals = document.getElementById("modals");
  modals.style.display = "flex";
  //   modals.innerHTML = "";
};

var closeModal = function () {
  var modals = document.getElementById("modals");
  modals.style.display = "none";
  //   modals.innerHTML = "";
};

var setStatus = (status) => {
  var stat = document.getElementById("status");
  var color = null;
  if (status === 1) color = "linear-gradient(180deg, rgb(78, 255, 97),#2c2d2d)";
  if (status === 0) color = "linear-gradient(180deg, rgb(255, 0, 72),#2c2d2d)";
  stat.style.background = color;
};

var showonDoc = (str) => {
  // console.log("I'm here(showonDoc)");
  var news = document.createElement("div");
  news.setAttribute("onclick", "copyJSON(this)");
  news.innerText = str;
  document.getElementById("messages").appendChild(news);
};

var copyJSON = function (el) {
  var range = document.createRange();
  // console.log("I'm here : " + el.innerHTML);
  range.selectNode(el);
  window.getSelection().removeAllRanges(); // clear current selection
  window.getSelection().addRange(range); // to select text
  document.execCommand("copy");
  window.getSelection().removeAllRanges(); // to deselect
};

var gogoHost = function () {
  document.getElementById("client").setAttribute("noshow", "");
  document
    .getElementById("SDP")
    .setAttribute("placeholder", "SDP(Answer) from Client");
  document.getElementById("host").setAttribute("onclick", "connToClient()");
  document.getElementById("host").innerText = "Connect to Client";
  document.getElementById("closeConn").removeAttribute("noshow");
  document.getElementById("closeConn").setAttribute("onclick", "dc.close()");
  // if (iceCandidates != []) iceCandidates.forEach((e) => showonDoc(e));
  hostSide();
};

var closeHost = () => {
  if(dc.ice) dc.restartIce();
  document.getElementById("messages").innerHTML = "";
  document.getElementById("host").innerText = "Become a Host";
  document.getElementById("client").removeAttribute("noshow");
  document.getElementById("closeConn").setAttribute("noshow", "");
  document
    .getElementById("SDP")
    .setAttribute("placeholder", "SDP(Answer) from Host");

  document.getElementById("host").setAttribute("onclick", "gogoHost()");
};

gogoClient = function () {
  var SDP = document.getElementById("SDP");
  if (SDP.value == "") {
    SDP.setAttribute("class", "empty");
    console.log("ERROR");
    return;
  }
  console.log("SUCCESS");
  SDP.setAttribute("class", "");
  document.getElementById("host").setAttribute("noshow", "");
  document.getElementById("SDP").setAttribute("noshow", "");
  document.getElementById("closeConn").removeAttribute("noshow");
  if(typeof(rc.dc) == undefined) sendError("No Connections Established");
  else document.getElementById("closeConn").setAttribute("onclick", "rc.dc.close()");
  // if (iceCandidates != []) iceCandidates.forEach((e) => showonDoc(e));
  clientSide(JSON.parse(SDP.value));
  SDP.value == "";
};

var closeClient = () => {
  if(rc.ice) rc.restartIce();
  document.getElementById("messages").innerHTML = "";
  // document.getElementById("host").innerText = "Become a Host";
  document.getElementById("host").removeAttribute("noshow");
  document.getElementById("closeConn").setAttribute("noshow", "");
  document.getElementById("SDP").removeAttribute("noshow");
  // document.getElementById("host").setAttribute("onclick", "gogoHost()");
};

var sendError = (e) => {
  var modals = document.getElementById("modal");
  modals.innerHTML = `<div class="modal">
                          <div>${e}</div>
                      </div>`;
  setStatus(0);
  closeClient();
  openModal();
}