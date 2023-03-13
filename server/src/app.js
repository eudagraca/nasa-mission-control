const express = require('express')
const cors = require('cors')
const path = require('path')
const planetsRouter = require('./routes/planets/planets.router')
const launchesRouter = require('./routes/launches/launches.router')
const app = express()
const morgan = require('morgan')

app.use(cors({
    origin: 'http://localhost:3000',
    origin: 'http://127.0.0.1:8000',
}))
app.use(morgan('combined'))
app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use("/planets",planetsRouter)
app.use("/launches",launchesRouter)
app.get('/*', (req, res) => {
    return res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})
module.exports = app