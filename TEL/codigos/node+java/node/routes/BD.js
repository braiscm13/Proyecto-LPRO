const express = require('express');
const router = express.Router();
const Turno = require('../models/Turno');
const TT = require('../models/TT');
const date = new Date();

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

router.get('/Turno',async (req, res) => {
    await Turno.deleteMany();
});
router.get('/TT',async (req, res) => {
    await TT.deleteMany();
});

module.exports = router;