const SchemaPet = require("../models/pet");
const SchemaAtendimento = require("../models/atendimento");

async function getPet(res) {
  const pet = await SchemaPet.find();
  return res.json(pet);
}

async function getPetID(req, res) {
  const id = req.params.id;
  const pet = await SchemaPet.find({ _id: id });
  return res.json(pet);
}

module.exports = { getPet, getPetID };
