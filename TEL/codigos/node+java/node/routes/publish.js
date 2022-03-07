const mqtt = require('mqtt');

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

module.exports = function s(turno) {

    client.publish(topicTurno, turno, {
      qos: 0,
      retain: false
    }, (error) => {
      if (error) {
        console.error(error)
      }
    });
    console.log("siguiente turno published successfully");
  }