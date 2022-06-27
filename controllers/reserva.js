const Reserva = require("../models/reserva");
const Cuidador = require("../models/cuidador");
const Atendimento = require("../models/atendimento");
const Pet = require("../models/pet");

async function reserva(res) {
  try {
    const reserva = await Reserva.find();
    return res.json(reserva);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function reservaID(req, res) {
  try {
    const id = req.params.id;
    const reserva = await Reserva.find({ _id: id });
    return res.json(reserva);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function realizarReserva(req, res) {
  const body = req.body;
  try {
    const cuidadores = await Cuidador.find();
    let sort = Math.floor(Math.random() * cuidadores.length);
    const { nome, id, sexo, experiencia } = cuidadores[sort]._doc;
    const cuidador = { cuidador: { nome, id, sexo, experiencia } };
    if (body.efetivado) {
      body.efetivado = false;
    }
    await Reserva.create(Object.assign(body, cuidador));
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
    const atualizarEfetividade = await Reserva.updateOne({ _id: id }, body);
    const addAtendimento = await Reserva.find({ efetivado: true });
    addAtendimento.forEach(async (e) => {
      let objetoAtendimento = {
        status: "recebido",
        pet: e.pet,
        cuidador: e.cuidador,
      };
      await Pet.insertMany(e.pet);
      await Atendimento.insertMany(objetoAtendimento);
      await Reserva.deleteMany({ _id: id });
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
    await Reserva.deleteOne({ _id: id });
    return res.status(201).json({ messagem: "reserva apagada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports = {
  reserva,
  reservaID,
  realizarReserva,
  efetivarReserva,
  apagarReservaID,
};
