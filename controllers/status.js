const Atendimento = require("../models/atendimento");

async function statusID(req, res) {
  const id = req.params.id;
  const body = req.body;

  try {
    if (
      body.status == "finalizado" ||
      body.status == "recebido" ||
      body.status == "em atendimento" ||
      body.status == "pronto"
    ) {
      await Atendimento.updateOne({ _id: id }, body);
      res.status(201).json(body);
    } else {
      res
        .status(404)
        .json({
          error:
            "Por favor digitar algum status válido : finalizado, pronto, em atendimento, recebido",
        });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports = { statusID };
