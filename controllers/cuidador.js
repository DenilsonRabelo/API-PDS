const SchemaCuidador = require("../models/cuidador");

async function cuidador(res) {
  const cuidador = await SchemaCuidador.find();
  return res.json(cuidador);
}

async function cuidadorID(req, res) {
  const id = req.params.id;
  const cuidador = await SchemaCuidador.find({ _id: id });
  return res.json(cuidador);
}

async function criarCuidador(req, res) {
  const body = req.body;
  try {
    await SchemaCuidador.create(body);
    res.status(201).json({ mensagem: "criação feita com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports = { cuidador, cuidadorID, criarCuidador };
