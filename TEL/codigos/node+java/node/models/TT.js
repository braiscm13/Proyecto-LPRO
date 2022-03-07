const {Schema,model} = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const ttSchema = new Schema({
    cola : Number,
    hora : Date
});
/*
turnoSchema.plugin(autoIncrement.plugin, {
    model: 'Turno',
    field: 'turno'
});*/

module.exports = model('TT',ttSchema);