const Controller = require("../controllers/atendimento");
const ControllerStatus = require("../controllers/status")

const express = require("express");
const router = express.Router();

router.get("/atendimento", async (req, res) => {
  Controller.atendimento(res);
});

router.get("/atendimento/:id", async (req, res) => {
  Controller.atendimentoID(req, res);
});

router.get("/atendimento-status/:status", async (req, res) => {
  Controller.AtendimentoStatus(req, res);
});

router.delete("/atendimento/:id", async (req, res) => {
  Controller.deleteAtendimentoID(req, res);
});

router.put("/atendimento/:id", async (req, res) => {
  Controller.EditarAtendimentoID(req, res);
});

router.put("/status/:id", async (req, res) => {
    ControllerStatus.statusID(req, res);
});

module.exports = (app) => app.use("/API-PDS", router);
