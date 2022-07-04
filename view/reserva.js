const reservaController = require("../controllers/reserva");

const express = require("express");
const router = express.Router();

router.get("/reserva", async(req, res) => {
    reservaController.reserva(res);
});

router.get("/reserva/:id", async(req, res) => {
    reservaController.reservaID(req, res);
});

router.delete("/reserva/:id", async(req, res) => {
    reservaController.apagarReservaID(req, res);
});

router.post("/reserva", async(req, res) => {
    reservaController.realizarReserva(req, res);
});

router.put("/reserva/:id", async(req, res) => {
    reservaController.efetivarReserva(req, res);
});
router.put("/reservaedt/:id", async(req, res) => {
    reservaController.editarReservaID(req, res);
});

module.exports = (app) => app.use("/API-PDS", router);