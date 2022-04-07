const {Schema,model} = require('mongoose');

const ttSchema = new Schema({
    cola : Number,
    hora : Date
});

module.exports = model('TT',ttSchema);