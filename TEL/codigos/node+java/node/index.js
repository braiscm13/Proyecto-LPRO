const express = require('express');

const app= express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

var dgram = require('dgram');

var sem = require('semaphore')(1);


app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Content-Length': contentLength,'Content-Type': 'application/json");
   next();
  });

  const newTurn = require('./routes/newTurn');
  const nextTurn = require('./routes/nextTurn');
  const suscribir = require('./routes/operaciones_broker');


app.use('/newTurn',newTurn);//.setMaxListeners(1);
app.use('/nextTurn',nextTurn);
app.use('/suscribir',suscribir);


app.get("/",(req,res)=>{
    return res.json({hora:Date()});
});
app.post("/",(req,res)=>{
    console.log(req.body);
    return res.json({hh33:"ww33"});
});

mongoose.connect('mongodb://localhost:27017/SuInt',
{ useNewUrlParser: true , useUnifiedTopology: true });

app.listen(3000,()=>{
    console.log('listening on port 3000');

});