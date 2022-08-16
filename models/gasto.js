const mongoose = require('mongoose')

const GastoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        required: true
    },
    mes: {
        type: Number,
        requires: true
    },
    ano: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.ObjectId,
        requires: true
    }    
})

const Gasto = mongoose.model('Gasto', GastoSchema)

module.exports = Gasto