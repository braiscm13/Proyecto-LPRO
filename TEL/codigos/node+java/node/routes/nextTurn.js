const mqtt = require('mqtt');
const express = require('express');
const {
  publish,
  publish_hay
} = require('./publish');

const router = express.Router();
const Turno = require('../models/Turno');
const init = Date.now();
var espera = [5, 5, 5, 1, 1, 1];

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
      espera[cola-1] = (espera[cola-1] * espera[cola + 2] + (Date.now() - init - siguiente.hora) / 60000) / (espera[cola + 2] + 1);
      espera[cola + 2] + 1;
      var following = await Turno.find({
          cola: req.body.cola
        })
        .sort({
          hora: 1
        }).limit(4);
      
      for (var i = 0; i < following.length; i++) {
        following[i]=following[i].turno;
      }
      var respuesta = {
        Next: siguiente.turno,
        Espera: Math.round(espera[cola-1]),
        Following: following
      };
      publish(respuesta, cola);
      if(following.length==0){
        publish_hay(false,req.body.cola);
      }
      res.json(respuesta);

    } catch (e) {//no hay nadad en la cola
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