const mqtt = require('mqtt');
const express = require('express');
const router = express.Router();
const Turno = require('../models/Turno');
const fecha = new Date();
/*
import {Mutex} from 'await-semaphore';
 
var mutex = new Mutex();*/

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

var old = new Array(0, 0, 0);
var aux;
router.post('/', async (req, res) => {

    if (req.body.cola != null) {
        //   var release = await mutex.acquire();
        try {
            const newTurn = await Turno.findOneAndDelete({
                    cola: req.body.cola
                })
                .sort({
                    turno: old[aux]
                }).limit(1);
            old = newTurn.turno;
            if (old[aux] >= 1000) {
                old[aux] = 0;
            }
        } catch (e) {
            //release();
            res.json({
                status: "No hay más turnos"
            })
        }
        //release();
        try {
            
                  siguiente_turno(old);     
            res.json(old);
        } catch (error) {

        }



    }
    try {
        res.json({
            err: "cola necesaria"
        })
    } catch (error) {

    }

});


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
  });

module.exports = router;