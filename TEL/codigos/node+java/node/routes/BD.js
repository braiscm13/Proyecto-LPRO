const express = require('express');
const router = express.Router();
const Turno = require('../models/Turno');


router.post('/', async (req, res) => { 
    
    res.json({1: await Turno.find({
        cola: 1,
    }),2:await Turno.find({
        cola: 2,
    }),3:await Turno.find({
        cola: 3,
    })});
});



module.exports = router;