const express = require('express');
const router = express.Router();
const Turno = require('../models/Turno');
const TT = require('../models/TT');

router.post('/', async (req, res) => {

    console.log(req.body);

    const newTurno = new Turno({
        turno: req.body.turno,
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
// PUBLICACION MQTT PARA QUE VEAN TODOS EL CAMBIO
/*    try {
        res.json({res: await Turno.find({
            cola: req.body.cola
          })
          .sort({
            hora: 1
          }).limit(5)
        });

  
      } catch (e) {
        console.log(e);
        res.json({
          status: "No hay mas turnos"
        })
      }
              */
// PUBLICACION MQTT PARA QUE VEAN TODOS EL CAMBIO
    console.log(newTurno);
    res.json(newTurno);
});

module.exports = router;