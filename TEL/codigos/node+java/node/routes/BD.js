const express = require('express');
const router = express.Router();
const Turno = require('../models/Turno');
const Aforo = require('../models/Aforo');
const TT = require('../models/TT');
const date = new Date();
const {
    publish_aforo
  } = require('./publish');

router.post('/Turno', async (req, res) => { 
    
    res.json({1: await Turno.find({
        cola: 1,
    }),2:await Turno.find({
        cola: 2,
    }),3:await Turno.find({
        cola: 3,
    })});
});
router.post('/TT', async (req, res) => { 
    
    res.json({1: await TT.find({
        cola: 1,
    }),2:await TT.find({
        cola: 2,
    }),3:await TT.find({
        cola: 3,
    })});
});
router.post('/Aforo', async (req, res) => { 
    
    res.json(await Aforo.find());
});

router.get('/Turno',async (req, res) => {
    await Turno.deleteMany();
});
router.get('/TT',async (req, res) => {
    await TT.deleteMany();
});
router.get('/People',async (req, res) => {
    await Aforo.deleteMany();
});

router.post('/People',async(req,res)=>{
    var people= req.body.people;
    
    const newAforo = new Aforo({
        aforo: people,
        fecha: Date()
      }).save((err, document) => {
        if (err) console.log(err);
        else console.log(document);
      });

    publish_aforo(people);
    res.json("a");
});

module.exports = router;