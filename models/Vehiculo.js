const { Schema, model } = require("mongoose");

const Vehiculo = Schema({
    placa:{
        type: String,
        required: true,
        trim: true
    },
    tipo:{
        type: String,
        required: true,
        trim: true
    }
})

module.exports = model('Vehiculo', Vehiculo)
