const atendimentoController = require("../controllers/atendimento");
const statusController = require("../controllers/status")

const express = require("express");
const router = express.Router();

router.get("/atendimento", async(req, res) => {
    atendimentoController.atendimento(res);
});

router.get("/atendimento/:id", async(req, res) => {
    atendimentoController.atendimentoID(req, res);
});

router.get("/atendimento-status/:status", async(req, res) => {
    atendimentoController.AtendimentoStatus(req, res);
});

router.delete("/atendimento/:id", async(req, res) => {
    atendimentoController.deleteAtendimentoID(req, res);
});

router.put("/atendimento/:id", async(req, res) => {
    atendimentoController.EditarAtendimentoID(req, res);
});

router.put("/status/:id", async(req, res) => {
    statusController.statusID(req, res);
});

module.exports = (app) => app.use("/API-PDS", router);