const {Schema,model} = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const turnoSchema = new Schema({
    turno: {
        type: Number,
        required: true 
     },
    cola : Number,
    hora : Date,
    route : String
});
/*
turnoSchema.plugin(autoIncrement.plugin, {
    model: 'Turno',
    field: 'turno'
});*/

module.exports = model('Turno',turnoSchema);