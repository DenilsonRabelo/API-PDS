const Cuidador = require("../models/cuidador");

async function cuidador(res) {
  try {
    const cuidador = await Cuidador.find();
    return res.json(cuidador);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function cuidadorID(req, res) {
  try {
    const id = req.params.id;
    const cuidador = await Cuidador.find({ _id: id });
    return res.json(cuidador);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function criarCuidador(req, res) {
  const body = req.body;
  try {
    const id = await Cuidador.create(body);
    res.status(201).json({ id: id._id });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function apagarCuidadorID(req, res) {
  try {
    const id = req.params.id;
    await Cuidador.deleteOne({ _id: id });
    return res.status(201).json({ id: id });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function editarCuidadorID(req, res) {
  try {
    const id = req.params.id;
    const body = req.body;
    await Cuidador.updateOne({ _id: id }, body);
    res.status(201).json({ id: id });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports = {
  cuidador,
  cuidadorID,
  criarCuidador,
  apagarCuidadorID,
  editarCuidadorID,
};
