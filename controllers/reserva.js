const Reserva = require("../models/reserva");
const Cuidador = require("../models/cuidador");


const reservaService = require("../service/service.js");

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
    const idReserva = await Reserva.create(Object.assign(body, cuidador));
    res.status(201).json({ id: idReserva._id });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function efetivarReserva(req, res) {
  const id = req.params.id;
  const body = req.body;

  try {
    const queryParametros = await Reserva.updateOne({ _id: id }, body);
    const getReserva = await Reserva.find({ efetivado: true });
    await reservaService.mountreserva(getReserva, id);
    if (queryParametros.matchedCount === 0) {
      res.status(204).json({ mensagem: "Usuario não encontrado" });
      return;
    }
    res.status(201).json({ id: id });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
async function editarReservaID(req, res) {
  try {
    const id = req.params.id;
    const body = req.body;
    if (body.efetivado) {
      return res
        .status(400)
        .json("message : você não pode passar efetivado = true");
    }
    await Reserva.updateOne({ _id: id }, body);
    return res
      .status(201)
      .json(`message : reserva editada com sucesso, id: ${id}`);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function apagarReservaID(req, res) {
  try {
    const id = req.params.id;
    await Reserva.deleteOne({ _id: id });
    return res.status(201).json({ id: id });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports = {
  reserva,
  reservaID,
  realizarReserva,
  efetivarReserva,
  editarReservaID,
  apagarReservaID,
};
