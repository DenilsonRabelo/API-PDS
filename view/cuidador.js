const cuidadorController = require("../controllers/cuidador");

const express = require("express");
const router = express.Router();

router.get("/cuidador", async(req, res) => {
    cuidadorController.cuidador(res);
});

router.get("/cuidador/:id", async(req, res) => {
    cuidadorController.cuidadorID(req, res);
});

router.delete("/cuidador/:id", async(req, res) => {
    cuidadorController.apagarCuidadorID(req, res);
});

router.post("/cuidador", async(req, res) => {
    cuidadorController.criarCuidador(req, res);
});

router.put("/cuidador/:id", async(req, res) => {
    cuidadorController.editarCuidadorID(req, res);
});

module.exports = (app) => app.use("/API-PDS", router);