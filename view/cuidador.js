const Controller = require("../controllers/cuidador");

const express = require("express");
const router = express.Router();

router.get("/cuidador", async (req, res) => {
  Controller.cuidador(res);
});

router.get("/cuidador/:id", async (req, res) => {
  Controller.cuidadorID(req, res);
});

router.delete("/cuidador/:id", async (req, res) => {
  Controller.apagarCuidadorID(req, res);
});

router.post("/cuidador", async (req, res) => {
  Controller.criarCuidador(req, res);
});

router.put("/cuidador/:id", async (req, res) => {
  Controller.editarCuidadorID(req, res);
});

module.exports = (app) => app.use("/API-PDS", router);
