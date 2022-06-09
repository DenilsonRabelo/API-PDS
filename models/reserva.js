const { Schema, model } = require('mongoose');


const mongoose = require("mongoose")


const schemaReserva = new mongoose.Schema({
    efetivado : Boolean,
    pet:{nome: String, raca: String, peso: Number, objetivo: String, id: Number, nome_dono : String, telefone: Number},
	cuidador: {nome: String, id: Number, sexo: String, experiencia: String}
}, { strict: false })


module.exports = mongoose.model('reserva', schemaReserva)