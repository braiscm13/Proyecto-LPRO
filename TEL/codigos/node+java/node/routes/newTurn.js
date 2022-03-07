const express = require('express');
const router = express.Router();
const Turno = require('../models/Turno');
const TT = require('../models/TT');


//const Mutex = require('await-semaphore');

//import {Semaphore} from 'await-semaphore';

//var mutex = Mutex.Mutex;

var n = 0;

router.post('/', async (req, res) => {


    console.log(req.body);

    // Concurrencia en la peticion de turno
   // var release = await mutex.acquire();
    n++;
    //release();

    // ------------------------------

    const newTurno = new Turno({
        turno: n,
        cola: req.body.cola,
        hora: new Date(),
        route: req.body.route,

    });

    newTurno.save((err, document) => {
        if (err) console.log(err);
        else console.log(document);
    });


    const newTT = new TT({
        cola: req.body.cola,
        hora: new Date()
    });

    newTT.save((err, document) => {
        if (err) console.log(err);
        else console.log(document);
    });

    console.log(newTurno);
    res.json(newTurno);
});

module.exports = router;