const Controller = require("../controllers/reserva");

const express = require("express");
const router = express.Router();

router.get("/reserva", async (req, res) => {
  Controller.reserva(res);
});

router.get("/reserva/:id", async (req, res) => {
  Controller.reservaID(req, res);
});

router.delete("/reserva/:id", async (req, res) => {
  Controller.apagarReservaID(req, res);
});

router.post("/reserva", async (req, res) => {
  Controller.realizarReserva(req, res);
});

router.put("/reserva/:id", async (req, res) => {
  Controller.efetivarReserva(req, res);
});

module.exports = (app) => app.use("/API-PDS", router);
