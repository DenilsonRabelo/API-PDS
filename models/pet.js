const { Schema, model } = require('mongoose');


const mongoose = require("mongoose")


const schemaPet = new mongoose.Schema({
	nome: String,
	raca: String,
	peso: Number,
    objetivo: String,
    id: Number,
    nome_dono : String,
    telefone : Number
},)


module.exports = mongoose.model('pet', schemaPet)