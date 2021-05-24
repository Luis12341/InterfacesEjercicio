const { Schema, model } = require("mongoose");

const Estacionamiento = Schema({
    cedula:{
        type: String,
        required: true,
        trim: true
    },
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    horaEntrada:{
        type: Date,
        default: Date.now()
    },
    horaSalida:{
        type: Date,
    },
    montoPagado: {
        type: Number,
    },
    vehiculo:{
        type: Schema.Types.ObjectId,
        ref: 'Vehiculo' 
    },
})

module.exports = model('Estacionamiento', Estacionamiento)