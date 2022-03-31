const {Schema,model} = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const mongoose = require('mongoose');
const mongooseLong= require('mongoose-long');
mongooseLong(mongoose);
const Long = mongoose.Schema.Types.Long;


const turnoSchema = new Schema({
    turno: {
        type: String,
        required: true 
     },
    cola : Number,
    hora : Long,
});
/*
turnoSchema.plugin(autoIncrement.plugin, {
    model: 'Turno',
    field: 'turno'
});*/

module.exports = model('Turno',turnoSchema);