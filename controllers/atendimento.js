const Atendimento = require("../models/atendimento");
const Pet = require("../models/pet");

async function atendimento(res) {
  try {
    const atendimento = await Atendimento.find();
    return res.json(atendimento);
  } catch (error) {
    return res.json({ erro: erro });
  }
}

async function atendimentoID(req, res) {
  try {
    const id = req.params.id;
    const atendimento = await Atendimento.find({ _id: id });
    return res.json(atendimento);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function AtendimentoStatus(req, res) {
  try {
    const status = req.params.status;
    const atendimento = await Atendimento.find({ status: status });
    return res.json(atendimento);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function deleteAtendimentoID(req, res) {
  try {
    const id = req.params.id;
    const att = await Atendimento.find({ _id: id });
    await Atendimento.deleteOne({ _id: id });
    await Pet.deleteOne({
      peso: att[0].pet.peso,
      nome_dono: att[0].pet.nome_dono,
      objetivo: att[0].pet.objetivo,
    });
    return res.status(201).json({ id: id });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function EditarAtendimentoID(req, res) {
  try {
    const id = req.params.id;
    const body = req.body;
    await Atendimento.updateOne({ _id: id }, body);
    return res
      .status(201)
      .json(`message : atendimento editado com sucesso, id: ${id}`);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports = {
  atendimento,
  atendimentoID,
  deleteAtendimentoID,
  EditarAtendimentoID,
  AtendimentoStatus,
};
