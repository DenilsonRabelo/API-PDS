const Pet = require("../models/pet");

async function getPet(res) {
  try {
    const pet = await Pet.find();
    return res.json(pet);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function getPetID(req, res) {
  try {
    const id = req.params.id;
    const pet = await Pet.find({ _id: id });
    return res.json(pet);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports = { getPet, getPetID };
