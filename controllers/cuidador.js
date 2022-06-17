const SchemaCuidador = require("../models/cuidador");

async function cuidador(res) {
  try {
    const cuidador = await SchemaCuidador.find();
    return res.json(cuidador);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function cuidadorID(req, res) {
  try {
    const id = req.params.id;
    const cuidador = await SchemaCuidador.find({ _id: id });
    return res.json(cuidador);
  } catch (error) {
    res.status(500).json({ error: error });
  }
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

async function apagarCuidadorID(req, res) {
  try {
    const id = req.params.id;
    await SchemaCuidador.deleteOne({_id: id});
    return res.status(201).json({mensagem: "cuidador apagado com sucesso"});
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports = { cuidador, cuidadorID, criarCuidador, apagarCuidadorID };
