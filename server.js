// importar modulos
const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')
const app = express()
require('dotenv').config()

app.use(
    express.urlencoded({
        extended: true
    })
)

// middlewares
const verifyToken = require("./helpers/check-token");

app.use(cors())
app.use(express.json())

// importar rotas

// routes
const authRouter = require("./routes/authRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const gastoRouter = require('./routes/gastoRoutes')

app.use("/api/auth", authRouter);
app.use("/api/user", verifyToken, userRouter);
app.use('/api/gasto', gastoRouter)
app.use('/', (req, res) => {
    res.status(200).json({ msg: "API funcionando!" })
})
console.log('deu boa!')

// conectar mongoDB ATLAS
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const url = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.liky5cy.mongodb.net/?retryWrites=true&w=majority`

const port = process.env.PORT || 3000
console.log('Deu boa até aqui!')

mongoose.connect(url)
    .then(() => {
        console.log('Conectado ao MongoDB com sucesso!')
        app.listen(port)
    })
    .catch((err) => console.log(err))




