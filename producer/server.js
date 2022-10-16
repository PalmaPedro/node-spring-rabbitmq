const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const amqp = require('amqplib/callback_api');
const path = require('path');

app.use(express.static('public'))

// serve view
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

io.on('connection', socket => {
  console.log('a user connected');
  amqp.connect('amqp://localhost', (err0, connection) => {
      if (err0) {
          throw err0
      }
      connection.createChannel((err1, channel) => {
          if (err1) {
              throw err1
          }
          const QUEUE_1 = 'temperature.queue'
          //const QUEUE_2 = 'PULL'
          channel.assertQueue(QUEUE_1)
          //channel.assertQueue(QUEUE_2)
          socket.on('PUBLISH', value => {
              console.log(value)
              const data = {
                  value,
                  //id: socket.id
              }
              channel.sendToQueue(QUEUE_1, Buffer.from(JSON.stringify(data)))
              //io.to(data.id).emit('SUBSCRIBE', `Sent: ${data.message}`)
          })
         /*  channel.consume(QUEUE_2, (message) => {
              const data = JSON.parse(message.content.toString())
              io.to(data.id).emit('SUBSCRIBE', `Received: ${data.message}`)
          }, { noAck: true }) */
      })
  })

})

const port = process.env.PORT || 3001;

http.listen(port);
console.log('Server started at http://localhost:' + port);