const {Schema,model} = require('mongoose');
const mongoose = require('mongoose');

const aforoSchema = new Schema({
    aforo: {
        type: String,
        required: true 
     },
    timestamp : timestamp
});

module.exports = model('Aforo',aforoSchema);