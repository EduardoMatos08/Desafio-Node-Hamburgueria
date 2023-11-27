// Importando a Biblioteca
const express = require('express')
const uuid = require('uuid')

// Definino a Porta
const port = 1834
console.log(`Server Hosted on Port: ${port}.`)
const app = express()
app.use(express.json())

// Pedidos //
const orders = []

// Buscando Pedidos - ".get"
app.get('/orders', (request, response) => {
    return response.status(200).json(orders)
})

