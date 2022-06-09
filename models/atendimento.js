const { Schema, model } = require('mongoose');


const mongoose = require("mongoose")


const schemaAtendimento = new mongoose.Schema({
    status : String,
    pet:{nome: String, raca: String, peso: Number, objetivo: String, id: Number, nome_dono : String, telefone: Number}
}, { strict: false })


module.exports = mongoose.model('atendimento', schemaAtendimento)