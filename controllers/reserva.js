const SchemaReserva = require("../models/reserva");
const SchemaCuidador = require("../models/cuidador");
const SchemaAtendimento = require("../models/atendimento");
const SchemaPet = require("../models/pet");

async function reserva(res) {
  try {
    const reserva = await SchemaReserva.find();
    return res.json(reserva);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function reservaID(req, res) {
  try {
    const id = req.params.id;
    const reserva = await SchemaReserva.find({ _id: id });
    return res.json(reserva);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function realizarReserva(req, res) {
  const body = req.body;
  try {
    const cuidadores = await SchemaCuidador.find();
    let sort = Math.floor(Math.random() * cuidadores.length);
    const { nome, id, sexo, experiencia } = cuidadores[sort]._doc;
    const cuidador = { cuidador: { nome, id, sexo, experiencia } };
    if (body.efetivado) {
      body.efetivado = false;
    }
    await SchemaReserva.create(Object.assign(body, cuidador));
    res
      .status(201)
      .json({ mensagem: "solicitação de reserva feita com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function efetivarReserva(req, res) {
  const id = req.params.id;
  const body = req.body;

  try {
    const atualizarEfetividade = await SchemaReserva.updateOne(
      { _id: id },
      body
    );
    const addAtendimento = await SchemaReserva.find({ efetivado: true });
    addAtendimento.forEach(async (e) => {
      let objetoAtendimento = { status: "", pet: e.pet };
      await SchemaPet.insertMany(e.pet);
      await SchemaAtendimento.insertMany(objetoAtendimento);
      await SchemaReserva.deleteMany({ _id: id });
    });

    if (atualizarEfetividade.matchedCount === 0) {
      res.status(422).json({ mensagem: "Usuario não encontrado" });
      return;
    }

    res.status(201).json(body);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function apagarReservaID(req, res) {
  try {
    const id = req.params.id;
    await SchemaReserva.deleteOne({ _id: id });
    return res.status(201).json({ messagem : "reserva apagada com sucesso"});
  } catch (error) {
    res.status(500).json({ error: error });
  }
}


module.exports = { reserva, reservaID, realizarReserva, efetivarReserva, apagarReservaID };
