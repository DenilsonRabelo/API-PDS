const SchemaAtendimento = require("../models/atendimento");

async function statusID(req, res) {
  const id = req.params.id;
  const body = req.body;

  try {
    await SchemaAtendimento.updateOne({ _id: id }, body);
    res.status(201).json(body);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports = { statusID };
