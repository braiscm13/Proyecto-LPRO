const mqtt = require('mqtt');

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

const publish = async (data,cola)=>{
var topic="cola"+cola;
console.log(data);
//var aux =new Buffer.from(data);//{"sensor_id":1234,"temperature":13};
    client.publish(topic,JSON.stringify(data), {
      qos: 0,
      retain: false
    }, (error) => {
      if (error) {
        console.error(error)
      }
    });
    console.log("siguiente turno published successfully cola: "+topic);
  };
  const publish_hay = async (data,cola)=>{
    var topic="hay"+cola;
    console.log(data);
    //var aux =new Buffer.from(data);//{"sensor_id":1234,"temperature":13};
        client.publish(topic,JSON.stringify(data), {
          qos: 0,
          retain: false
        }, (error) => {
          if (error) {
            console.error(error)
          }
        });
        console.log("siguiente turno published successfully cola: "+topic);
      };

      const publish_aforo = async (data)=>{
        //var aux =new Buffer.from(data);//{"sensor_id":1234,"temperature":13};
            client.publish("aforo",JSON.stringify(data), {
              qos: 0,
              retain: false
            }, (error) => {
              if (error) {
                console.error(error)
              }
            });
            console.log("AFORO published successfully: "+data);
          };
  module.exports={
    publish,
    publish_hay,
    publish_aforo,
  }