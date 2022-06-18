const SchemaAtendimento = require("../models/atendimento");
const SchemaPet = require("../models/pet")

async function atendimento(res) {
  try {
    const atendimento = await SchemaAtendimento.find();
    return res.json(atendimento);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function atendimentoID(req, res) {
  try {
    const id = req.params.id;
    const atendimento = await SchemaAtendimento.find({ _id: id });
    return res.json(atendimento);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function AtendimentoStatus(req, res){
  try {
    const status = req.params.status
    const atendimento = await SchemaAtendimento.find({ status: status });
    return res.json(atendimento);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}


async function deleteAtendimentoID(req, res){
  try {
    const id = req.params.id
    const att = await SchemaAtendimento.find({ _id: id });
    await SchemaAtendimento.deleteOne({_id: id})
    await SchemaPet.deleteOne({peso : att[0].pet.peso, nome_dono : att[0].pet.nome_dono, objetivo : att[0].pet.objetivo})
    return res.status(201).json()
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function EditarAtendimentoID(req, res){
  try {
    const id = req.params.id
    const body = req.body
    await SchemaAtendimento.updateOne({ _id: id }, body);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}




module.exports = { atendimento, atendimentoID, deleteAtendimentoID, EditarAtendimentoID, AtendimentoStatus };
