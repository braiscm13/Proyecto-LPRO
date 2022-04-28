const {Schema,model} = require('mongoose');
const mongoose = require('mongoose');

const aforoSchema = new Schema({
    aforo: {
        type: String,
        required: true 
     },
    fecha : Date
});

module.exports = model('Aforo',aforoSchema);