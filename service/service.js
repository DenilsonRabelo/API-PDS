const Reserva = require("../models/reserva");
const Atendimento = require("../models/atendimento");
const Pet = require("../models/pet");

async function mountreserva(objeto, id) {
  objeto.forEach(async (e) => {
    let objetoAtendimento = {
      status: "recebido",
      pet: e.pet,
      cuidador: e.cuidador,
    };
    await Pet.insertMany(e.pet);
    await Atendimento.insertMany(objetoAtendimento);
    await Reserva.deleteMany({ _id: id });
  });
}

module.exports = {
  mountreserva,
};
