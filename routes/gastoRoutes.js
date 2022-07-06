const router = require('express').Router()
const Gasto = require('../models/gasto')

// middlewares
const verifyToken = require("../helpers/check-token");

// helpers
const getUserByToken = require("../helpers/get-user-by-token");


router.post('/', verifyToken, async (req, res) => {

    const nome = req.body.nome
    const preco = req.body.preco
    const tipo = req.body.tipo
    const data = req.body.data
    const ano = Number(String(data).slice(0,4))
    const mes = Number(String(data).slice(5, 7))
    
    
    // pegar token
    const token = req.header('auth-token')
    
    const userByToken = await getUserByToken(token);
  
    const userId = userByToken._id.toString(); 
    // console.log(user, userId)

    if(nome == null || preco == null || tipo == null || data == null) {
        return res.status(400).json({ error: "Por favor preencha todos os campos" })
    }

    const gasto = {nome, preco, tipo, data, mes, ano, userId}

    try {
        await Gasto.insertMany(gasto)

        res.status(201).json({ msg: 'Gasto inserido com sucesso!' })

    } catch(error) {
        // APAGAR ANTES DE FINALIZAR
        res.status(500).json({ error })
    }
})

router.get('/', verifyToken, async (req, res) => {

    // pegar token do usuario
    const token = req.header('auth-token')
    const userByToken = await getUserByToken(token)
    const userId = userByToken._id.toString()

    try {

        const gastos = await Gasto.find({userId: userId})

        res.status(200).json({ gastos })

    } catch(error) {
        // APAGAR ANTES DE FINALIZAR
        res.status(500).json({ error })
    }
})

router.get('/mes', verifyToken, async (req, res) => {

    const mes = req.header('mes')
    const ano = req.header('ano')
    
    // pegar token do usuario
    const token = req.header('auth-token')
    const userByToken = await getUserByToken(token)
    const userId = userByToken._id.toString()

    try {

        const gastos = await Gasto.find({ mes: mes, ano: ano, userId: userId})

        res.status(200).json({ gastos })

    } catch(error) {
        // APAGAR ANTES DE FINALIZAR
        res.status(500).json({ error })
    }


})

router.delete('/', verifyToken, async (req, res) => {

    // pegar token do usuario
    const token = req.header('auth-token')

    const userByToken = await getUserByToken(token)
    const userId = userByToken._id.toString()

    const id = req.body.id
    
    
    try {

        await Gasto.deleteOne({ _id: id, userId: userId })
        res.status(200).json({ msg: "Gasto removido com sucesso!" })

    } catch(error) {
        // APAGAR ANTES DE FINALIZAR
        res.status(500).json({ error })
    }

})

module.exports = router