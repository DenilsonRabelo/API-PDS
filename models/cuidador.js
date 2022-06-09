const { Schema, model } = require('mongoose');


const mongoose = require("mongoose")


const schemaCuidador = new mongoose.Schema({
	nome: String,
    id: Number,
    sexo: String,
    experiencia: String
}, { strict: false })


module.exports = mongoose.model('cuidador', schemaCuidador)