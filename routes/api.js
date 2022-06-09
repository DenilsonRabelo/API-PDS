const SchemaPet = require('../models/pet');
const SchemaAtendimento = require('../models/atendimento')
const SchemaCuidador = require('../models/cuidador')
const SchemaReserva = require('../models/reserva')

const express = require('express');
const router = express.Router()


router.get('/pet', async (req, res) => {
    const pet = await SchemaPet.find();
    return res.json(pet);
});

router.get('/atendimento', async (req, res) => {
    const atendimento = await SchemaAtendimento.find();
    return res.json(atendimento);
});

router.get('/cuidador', async (req, res) => {
    const cuidador = await SchemaCuidador.find();
    return res.json(cuidador);
});


router.get('/reserva', async (req, res) => {
    const reserva = await SchemaReserva.find();
    return res.json(reserva);
});


module.exports = app => app.use('/API-PDS', router)