var extensionTextbox;
var connectButton;
var callButton;
var hangupButton;
var disconnectButton;
var audioElement;

const webSocketServer = "wss://webrtc.opcionguik.com.mx:7443"

const displayName = "SIP.js Demo";

document.addEventListener("DOMContentLoaded", function(event) {
	extensionTextbox = document.getElementById("txtExtension");
	connectButton = document.getElementById("btnConnect");
	callButton = document.getElementById("btnCall");
	hangupButton = document.getElementById("btnHangUp");
	disconnectButton = document.getElementById("btnDisconnect");
	audioElement = document.getElementById("remoteAudio");

});

const simpleUserDelegate = {
  onCallCreated: function (){
    callButton.disabled = true;
    hangupButton.disabled = false;
  },
  onCallAnswered: function () {
  },
  onCallHangup: function () {
    callButton.disabled = false;
    hangupButton.disabled = true;
  },
  onCallReceived: async () => {
      await receiveCall();
  }
};

const simpleUserOptions = {
  delegate: simpleUserDelegate,
  aor: "sip:"+ localStorage.getItem('user') +"@webrtc.opcionguik.com.mx",
  userAgentOptions: {
    logLevel: "debug",
    displayName,
    authorizationPassword: 'Hola.123',
    authorizationUsername: localStorage.getItem('user'),
    viaHost: 'webrtc.opcionguik.com.mx'
  },
  media: {
    remote: {
      audio: audioElement
    }
  }
};

var simpleUser = new SIP.SimpleUser(webSocketServer, simpleUserOptions);

function connect() {
	disable(true);
    simpleUser
        .connect()
        .then(function () {
        simpleUser.register().then(function () {
            console.log("registered");
            connectButton.disabled = true;
            disconnectButton.disabled = false;
            callButton.disabled = false;
            hangupButton.disabled = true;
        }).catch(function (error) {
            connectButton.disabled = false;
            console.error("[" + simpleUser.id + "] failed to register");
            console.error(error);
            alert("Failed to register.\n" + error);
        });
    })
        .catch(function (error) {
        connectButton.disabled = false;
        console.error("[" + simpleUser.id + "] failed to connect");
        console.error(error);
        alert("Failed to connect.\n" + error);
    });
}

function call() {
	callButton.disabled = true;
    hangupButton.disabled = true;
    var target = "sip:" + extensionTextbox.value + "@webrtc.opcionguik.com.mx";
    console.log("call " + target);
    simpleUser
        .call(target, {
        inviteWithoutSdp: false
    })
        .catch(function (error) {
        console.error("[" + simpleUser.id + "] failed to place call");
        console.error(error);
        alert("Failed to place call.\n" + error);
    });
}

function hangUp() {
	callButton.disabled = true;
    hangupButton.disabled = true;
    simpleUser.hangup().catch(function (error) {
        console.error("[" + simpleUser.id + "] failed to hangup call");
        console.error(error);
        alert("Failed to hangup call.\n" + error);
    });
}

function disconnect() {
	disable(true);
    simpleUser
        .disconnect()
        .then(function () {
        connectButton.disabled = false;
        disconnectButton.disabled = true;
        callButton.disabled = true;
        hangupButton.disabled = true;
    })
        .catch(function (error) {
        console.error("[" + simpleUser.id + "] failed to disconnect");
        console.error(error);
        alert("Failed to disconnect.\n" + error);
    });
	
}

async function receiveCall() {
	var response = confirm("Incoming call!\nWould you like to answer?");
	if(response === true)
	await simpleUser.answer();
	else
	await simpleUser.answer();
}

function disable(value)
{
	extensionTextbox.disabled = value;
	callButton.disabled = value;
	hangupButton.disabled = value;
	disconnectButton.disabled = value;
}