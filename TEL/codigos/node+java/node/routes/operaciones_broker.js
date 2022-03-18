const mqtt = require('mqtt');

const express = require('express');
const router = express.Router();

const host = 'localhost';
const port = '1883';
const clientId = `mqtt_Server`; //${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'server', //  ????
  password: 'public', // ????
  reconnectPeriod: 1000,
})

function establishConnection() {


}

const topicTurno = 'turno';

module.exports.siguienteTurno = function (data) {

  client.publish(topicTurno, data, {//JSON.stringify({ a: 5 }) JSON.parse(received)
    qos: 0,
    retain: false
  }, (error) => {
    if (error) {
      console.error(error)
    }
  });
  console.log("siguiente turno published successfully");
}


function leerTurno(req, res, next) {

  
}
router.get('/', (req, res) => {

  client.subscribe([topicTurno], () => {
    console.log(`Subscribe to topic '${topicTurno}'`);
  });

});

client.on('message', (topicTurno, payload) => {
  console.log('Received Message:', topicTurno, payload.toString());
});

module.exports = router;