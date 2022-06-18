const Pet = require("../controllers/pet");
const Atendimento = require("../controllers/atendimento");
const Cuidador = require("../controllers/cuidador");
const Reserva = require("../controllers/reserva");
const Status = require("../controllers/status");

const express = require("express");
const router = express.Router();



router.get("/pet", async (req, res) => {
  Pet.getPet(res);
});

router.get("/pet/:id", async (req, res) => {
  Pet.getPetID(req, res);
});




router.get("/atendimento", async (req, res) => {
  Atendimento.atendimento(res);
});

router.get("/atendimento/:id", async (req, res) => {
  Atendimento.atendimento(req, res);
});

router.get("/atendimento-status/:status", async (req, res) => {
  Atendimento.AtendimentoStatus(req, res)
});

router.delete("/apagar-atendimento/:id", async (req, res) => {
  Atendimento.deleteAtendimentoID(req,res);
})

router.patch("/editar-atendimento/:id", async (req, res) => {
  Atendimento.EditarAtendimentoID(req, res);
})




router.get("/cuidador", async (req, res) => {
  Cuidador.cuidador(res);
});

router.get("/cuidador/:id", async (req, res) => {
  Cuidador.cuidador(req, res);
});

router.delete("/apagar-cuidador/:id", async (req, res) => {
 Cuidador.apagarCuidadorID(req, res)
})

router.post("/criar-cuidador", async (req, res) => {
  Cuidador.criarCuidador(req, res);
});

router.patch("/editar-cuidador/:id", async (req, res) => {
  Cuidador.editarCuidadorID(req, res)
});


router.get("/reserva", async (req, res) => {
  Reserva.reserva(res);
});

router.get("/reserva/:id", async (req, res) => {
  Reserva.reservaID(req, res);
});

router.delete("/apagar-reserva/:id", async (req, res) => {
  Reserva.apagarReservaID(req, res);
});

//reserva
router.post("/realizar-reserva", async (req, res) => {
  Reserva.realizarReserva(req, res);
});

//passando o id (efetivar reserva)
router.patch("/efetivar-reserva/:id", async (req, res) => {
  Reserva.efetivarReserva(req, res);
});




//update status
router.patch("/alterar-status/:id", async (req, res) => {
  Status.statusID(req, res);
});


router.use(function(req, res, next) {
  res.status(404).json({message: 'Recurso indisponível'});
});

module.exports = (app) => app.use("/API-PDS", router);
