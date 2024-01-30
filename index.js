// Importando a Biblioteca
const express = require('express')
const uuid = require('uuid')

// Definino a Porta
const port = 1835
const app = express()
app.use(express.json())

// Pedidos //
const orders = []

// Checagem de ID - Middlewere
const checkOrderId = (request, response, next) => {

    const { id } = request.params
    const index = orders.findIndex(order => order.id === id)

    if(index === -1){
        return response.status(404).json({ mensage: "Order not Found" })
    }

    request.orderIndex = index
    request.orderId = id

    next()

}

// Tratamento de Erros - TRY && CATCH && FINALLY

// Buscando Pedidos - ".get"
app.get('/orders', (request, response) => {
    try{
        return response.status(200).json(orders)
    } catch{
        return response.status(500).json({error:err.message})
    }
})

// Enviando Pedido - ".post"
app.post('/orders', (request, response) => {
    try {
        const { name, client_order, price, status } = request.body
        const order = { id: uuid.v4(), name, client_order, price, status }
    
        orders.push(order)
    
        return response.status(201).json(order)
    } catch(err){
        return response.status(500).json({error:err.message})
    }
})

// Atualizando Pedido para: "Pronto" - ".put / .patch"
app.put('/orders/:id', checkOrderId, (request, response) => {
    try {
        const { id } = request.params
        const { name, client_order, price, status } = request.body
    
        const updatedOrder = { id, name, client_order, price, status }
        const index = orders.findIndex(order => order.id === id)
    
        orders[index] = updatedOrder
    
        return response.status(201).json(updatedOrder)
    } catch(err){
        return response.status(500).json({error:err.message})
    }
})

// Deletando Pedido - ".delete"
app.delete('/orders/:id', checkOrderId, (request, response) => {
    try{
        const { id } = request.params
        const index = orders.findIndex(order => order.id === id)

        orders.splice(index, 1)
        return response.status(404).json({ mensage: "Order not Found" })
    } catch(err){
        return response.status(500).json({error:err.message})
    }
})

// console.log() da porta
app.listen(port, () => {
    console.log(`Server hosted on port: ${port}.`)
})