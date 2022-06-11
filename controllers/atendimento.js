const SchemaAtendimento = require("../models/atendimento");

async function atendimento(res) {
  const atendimento = await SchemaAtendimento.find();
  return res.json(atendimento);
}

async function atendimentoID(req, res) {
  const id = req.params.id;
  const atendimento = await SchemaAtendimento.find({ _id: id });
  return res.json(atendimento);
}

module.exports = { atendimento, atendimentoID };
