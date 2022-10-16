const socket = io()

// variable to store our intervalID and value
let nIntervId;
let value;

const show = document.querySelector('#values').innerHTML
const send = document.querySelector('#generate')
const stop = document.querySelector('#stop')
const connect = document.querySelector('#connect')
const disconnect = document.querySelector('#disconnect')

send.addEventListener('click', (e) => {
    e.preventDefault()
    if (!nIntervId) {
        nIntervId = setInterval(() => {
            value = Math.round(Math.random() * 10);
            console.log('...sending data ' +value);
            showValue(value)
            socket.emit("PUBLISH", value)
        }, 1000)
    }
    value = ''
})

stop.addEventListener('click', (e) => {
    e.preventDefault()
    stopValues();
    //clearValues();
})

connect.addEventListener('click', (e) => {
  e.preventDefault()

})

function showValue(value) {
    $("#values").append("<tr><td>" + value + "</td></tr>");
}

function stopValues () {
    clearInterval(nIntervId);
    // release our intervalID from the variable
    nIntervId = null;
}

function clearValues() {
    $('#values').detach();
}

socket.on("connect", () => {
  alert(`Connected with ID: ${socket.id}`)
})

/* $(function () {
    $("form").on('submit', function(e) {
        e.preventDefault();
    });
    $("#connect").click(() => { connect(); });
    $("#disconnect").click(() => { disconnect(); });
    $("#send").click(() => { sendValue(); });

}) */