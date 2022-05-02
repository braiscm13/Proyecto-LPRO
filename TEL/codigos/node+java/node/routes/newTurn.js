const express = require('express');
const router = express.Router();
const Turno = require('../models/Turno');
const TT = require('../models/TT');
const crypto = require('crypto');

const impresora =require('./impresora.js');
const imprimir=async function(){
  const impr = new impresora();
  const write = await impr.write();
};

const init = Date.now();
const {
  publish,
  publish_hay
} = require('./publish');
router.post('/', async (req, res) => {

  var aux = [0, 0, 0];
  var peticion = req.body.cola.split('');
  var tam = peticion.length;

  for (var i = 0; i < tam; i++) {
    while (true) {
      aux[i] = crypto.randomBytes(2).toString('hex');
      if (await Turno.find({
          cola: peticion[i],
          turno: aux[i]
        })) break;
    }
    const newTurno = new Turno({
      turno: aux[i],
      cola: peticion[i],
      hora: Date.now() - init
    }).save((err, document) => {
      if (err) console.log(err);
      else console.log(document);
    });
    const newTT = new TT({
      cola: peticion[i],
      hora: new Date()
    }).save((err, document) => {
      if (err) console.log(err);
      else console.log(document);
    });
    publish_hay(true,peticion[i]);
  }
  var vuelta;

  if (tam == 1) {

    vuelta = {
      res: aux[0]
    };
  } else if (tam == 2) {
    vuelta = {
      res: [
        aux[0],
        aux[1]
      ]
    };
  } else {
    vuelta = {
      res: [
        aux[0],
        aux[1],
        aux[2]
      ]
    };
  }

  res.json({
    vuelta
  });

});
router.post('/imp', async (req, res)=>{
    imprimir(req.body);
    console.log(req.body);
});
module.exports = router;