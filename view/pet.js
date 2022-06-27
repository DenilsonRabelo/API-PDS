const Controller = require("../controllers/pet");

const express = require("express");
const router = express.Router();

router.get("/pet", async (req, res) => {
  Controller.getPet(res);
});

router.get("/pet/:id", async (req, res) => {
  Controller.getPetID(req, res);
});

module.exports = (app) => app.use("/API-PDS", router);
