const SchemaPet = require("../models/pet");
const SchemaAtendimento = require("../models/atendimento");

async function getPet(res) {
  try {
    const pet = await SchemaPet.find();
    return res.json(pet);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function getPetID(req, res) {
  try {
    const id = req.params.id;
    const pet = await SchemaPet.find({ _id: id });
    return res.json(pet);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports = { getPet, getPetID };
