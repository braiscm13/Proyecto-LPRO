const express = require('express');
const router = express.Router();
const Turno = require('../models/Turno');

const crypto = require('crypto');
var randomString=null;

router.post('/', async (req, res) => {

    while(true){
    randomString = crypto.randomBytes(2).toString('hex');

    if(await Turno.find({
        cola: req.body.cola,
        turno: randomString
    })) break;
    }
    res.json({turno: randomString});
});


module.exports = router;