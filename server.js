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
app.route('/', (req, res) => {
    res.status(200).json({ msg: "API funcionando!" })
})

// routes
const authRouter = require("./routes/authRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const gastoRouter = require('./routes/gastoRoutes')

app.use("/api/auth", authRouter);
app.use("/api/user", verifyToken, userRouter);
app.use('/api/gasto', gastoRouter)

// conectar mongoDB ATLAS
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const url = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.liky5cy.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url)
    .then(() => {
        console.log('Conectado ao MongoDB com sucesso!')
        app.listen(3000)
    })
    .catch((err) => console.log(err))




