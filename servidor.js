const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const app = express();
var cors = require('cors')
const bodyParser = require('body-parser')
var port = process.env.PORT || 3000
dotenv.config()

app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.json());

mongoose.connect(`${process.env.MONGOOSE_URL}`)
.then(console.log("conectado"))


require('./view/pet.js')(app)
require('./view/atendimento.js')(app)
require('./view/cuidador.js')(app)
require('./view/reserva.js')(app)

app.listen(port)