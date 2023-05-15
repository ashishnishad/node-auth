require('dotenv').config()
const port = process.env.PORT
const express = require('express')
const userRouter = require('./routers/user')
const db = require('./db/db')


const app = express()

app.use(express.json())
app.use(userRouter)


app.listen(port, () => {
    console.log(`Server running on ${port}...`)
})