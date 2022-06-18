const express = require('express')

const routerProductos = express.Router()

const productos = []

module.exports = routerProductos.get('/', (req,res) => {
    if (productos.length == 0){
        res.send({error: 'no hay productos cargados'})
    } else {
        res.send(productos)
    }
})

module.exports = routerProductos.get('/:id', (req,res) => {
    let index = parseInt(req.params.id)
    let productoBuscado = productos.filter(x => x.id === index)
    if(productoBuscado.length == 0){
        res.send({error:'producto no encontrado'})
    }else{
        res.send(productoBuscado)
    }
})

module.exports = routerProductos.post('/', (req,res) => {
    let nuevoProducto = {
        'title' : req.body.title,
        'price' : req.body.price,
        'thumbnail' : req.body.thumbnail,
        'id' : productos.length + 1
    }
    productos.push(nuevoProducto)
    res.send(nuevoProducto)
})

module.exports = routerProductos.put('/:id', (req,res) => {
    let indexModificar = parseInt(req.params.id)
    let productoModificar = productos.filter(x => x.id === indexModificar)
    productoModificar = req.body
    productos[req.params.id - 1] = productoModificar
    res.send('Producto Actualizado')
})

module.exports = routerProductos.delete('/:id', (req,res) => {
    let indexBorrar = parseInt(req.params.id)
    //let productoBorrado = productos.filter(x => x.id === indexBorrar)
    let indiceARemover = productos.findIndex(x => x.id === indexBorrar)
    if(indiceARemover != -1){
        productos.splice(indiceARemover,1)
        res.send('Producto borrado')
    }else{
        res.send({error : 'id producto no encontrado'})
    }
})