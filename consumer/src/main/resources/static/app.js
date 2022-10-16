let stompClient = null;

/**
 * Function to handle display of data
 * @param connected
 */
function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#values").html("");
}

/**
 * Function to establish websocket connection
 */

function connect() {
    const socket = new SockJS('/show-data');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/queue/temperature.queue', function (value) {
            showValue(JSON.parse(value.body).value);
        });
    });
}

/**
 * Function to end websocket connection
 */
function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendValue() {
    stompClient.send("/app/show-data", {}, JSON.stringify({'value': $("#value").val()}));
}

function showValue(value) {
    $("#values").append("<tr><td>" + value + "</td></tr>");
}

$(function () {
    $("form").on('submit', function(e) {
        e.preventDefault();
    });
    $("#connect").click(() => { connect(); });
    $("#disconnect").click(() => { disconnect(); });
    $("#send").click(() => { sendValue(); });

})