const petController = require("../controllers/pet");

const express = require("express");
const router = express.Router();

router.get("/pet", async(req, res) => {
    petController.getPet(res);
});

router.get("/pet/:id", async(req, res) => {
    petController.getPetID(req, res);
});

module.exports = (app) => app.use("/API-PDS", router);