const {Schema,model} = require('mongoose');

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
module.exports = model('Turno',turnoSchema);