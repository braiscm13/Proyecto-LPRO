const mqtt = require('mqtt');
const express = require('express');
const router = express.Router();
const Turno = require('../models/Turno');
const init = Date.now();
var espera=[5,5,5,1,1,1];

/*
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
});
*/
router.post('/', async (req, res) => {

  if (req.body.cola != null) {
    try {
      var siguiente = await Turno.findOneAndDelete({
          cola: req.body.cola
        })
        .sort({
          hora: 1
        }).limit(1);
        var cola = siguiente.cola;
        espera[cola]=(espera[cola]*espera[cola+3]+(Date.now()-init-siguiente.hora)/60000)/(espera[cola+3]+1);
        espera[cola+3]+1;
        res.json({
        next: siguiente,
        espera: espera[cola],
        following: await Turno.find({
            cola: req.body.cola
          })
          .sort({
            hora: 1
          }).limit(4)
      });

    } catch (e) {
      console.log(e);
      res.json({
        status: "No hay mas turnos"
      })
    }
    /*
        try {
        } catch (error) {
        }*/
  } else {
    try {
      res.json({
        err: "cola necesaria"
      })
    } catch (error) {

    }
  }
});

/*
const topicTurno = 'turno';
function siguiente_turno(turno) {

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

  router.get('/suscribe', (req, res) => {

    client.subscribe([topicTurno], () => {
      console.log(`Subscribe to topic '${topicTurno}'`);
    });
  
  });
  
  client.on('message', (topicTurno, payload) => {
    console.log('Received Message:', topicTurno, payload.toString());
  });*/

module.exports = router;