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

router.get('/pet/:id', async (req, res) => {
    const id = req.params.id
    const pet = await SchemaPet.find({_id:id});
    return res.json(pet);
})

router.get('/atendimento', async (req, res) => {
    const atendimento = await SchemaAtendimento.find();
    return res.json(atendimento);
});


router.get('/atendimento/:id', async (req, res) => {
    const id = req.params.id
    const atendimento = await SchemaAtendimento.find({_id:id});
    return res.json(atendimento);
});


router.get('/cuidador', async (req, res) => {
    const cuidador = await SchemaCuidador.find();
    return res.json(cuidador);
});

router.get('/cuidador/:id', async (req, res) => {
    const id = req.params.id
    const cuidador = await SchemaCuidador.find({_id:id});
    return res.json(cuidador);
});

router.post('/criar-cuidador', async (req, res) => {
    const body = req.body

    try {
        await SchemaCuidador.create(body)
        res.status(201).json({mensagem : 'criação feita com sucesso'})
    } catch (error) {
        res.status(500).json({error : error})
    }
});


router.get('/reserva', async (req, res) => {
    const reserva = await SchemaReserva.find();
    return res.json(reserva);
});

router.get('/reserva/:id', async (req, res) => {
    const id = req.params.id
    const reserva = await SchemaReserva.find({_id:id});
    return res.json(reserva);
});


//reserva
router.post('/realizar-reserva', async(req, res) => {
    const body = req.body
    try {
        const cuidadores  = await SchemaCuidador.find()
        let sort = Math.floor(Math.random() * cuidadores.length)
        const {nome, id, sexo, experiencia} = cuidadores[sort]._doc
        const cuidador = {cuidador: {nome, id, sexo, experiencia}}
        if(body.efetivado){
            body.efetivado = false
        }
        await SchemaReserva.create(Object.assign(body, cuidador))
        res.status(201).json({mensagem : 'solicitação de reserva feita com sucesso'})
    } catch (error) {
        res.status(500).json({error : error})
    }
})


//passando o id (efetivar reserva)
router.patch('/efetivar-reserva/:id', async(req, res) => {
    const id = req.params.id
    const body = req.body

    try {
        const atualizarEfetividade = await SchemaReserva.updateOne({_id : id}, body)
        const addAtendimento = await SchemaReserva.find({efetivado:true})
        addAtendimento.forEach(async e => {
            let objetoAtendimento = {status: "", pet : e.pet}
            await SchemaPet.insertMany(e.pet)
            await SchemaAtendimento.insertMany(objetoAtendimento)
            await SchemaReserva.deleteMany({_id:id})
        })

        if(atualizarEfetividade.matchedCount === 0){
            res.status(422).json({mensagem : 'Usuario não encontrado'})
            return
        }

        res.status(201).json(body)
    } catch (error) {
        res.status(500).json({error : error})
    }
})


//update status
router.patch('/alterar-status/:id', async (req,res) => {
    const id = req.params.id
    const body = req.body

    try {
        await SchemaAtendimento.updateOne({_id : id}, body)
        res.status(201).json(body)
    } catch (error) {
        res.status(500).json({error : error})
    }
})

module.exports = app => app.use('/API-PDS', router)