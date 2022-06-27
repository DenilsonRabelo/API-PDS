const { Schema, model } = require("mongoose");

const mongoose = require("mongoose");

const Cuidador = new mongoose.Schema(
  {
    nome: String,
    id: Number,
    sexo: String,
    experiencia: String,
  },
  { strict: false }
);

module.exports = mongoose.model("cuidador", Cuidador);
