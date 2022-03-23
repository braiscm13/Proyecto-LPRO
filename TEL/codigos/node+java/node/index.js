const express = require('express');

const app= express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const worker= require('worker_threads');

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
  const BD = require('./routes/BD');
  const createTurn = require('./routes/createTurn');
  const newTurn = require('./routes/newTurn');
  const nextTurn = require('./routes/nextTurn');
  const {publish} = require('./routes/publish');
  //const suscribir = require('./routes/operaciones_broker');

app.use('/BD',BD);
app.use('/createTurn', createTurn);
app.use('/newTurn',newTurn);//.setMaxListeners(1);
app.use('/nextTurn',nextTurn);
//app.use('/publish',publish);


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