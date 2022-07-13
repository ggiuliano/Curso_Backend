const express = require('express')
const Producto = require('../controller/productos.js')
const isAdmin = require('../middleware/userType')

const routerProductos = express.Router()


routerProductos.get('/:id?', (req, res) => {
    let listaProductos = new Producto().listar(req.params.id)
    res.send(listaProductos)
})

routerProductos.post('/', isAdmin ,(req, res) => {
    let nuevoProducto = new Producto().crear({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        codigo: req.body.codigo,
        foto: req.body.foto,
        precio: req.body.precio,
        stock: req.body.precio
    })
    printNuevoProducto = JSON.stringify(nuevoProducto)
    res.send(`Nuevo producto agregado con ID: ${printNuevoProducto}`);
})

routerProductos.put('/:id', isAdmin ,(req, res) => {
    let productoCambio = new Producto().actualizar({
        id: req.params.id,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        codigo: req.body.codigo,
        foto: req.body.foto,
        precio: req.body.precio,
        stock: req.body.stock
    })
    res.send(productoCambio);
})

routerProductos.delete('/:id', isAdmin ,(req, res) => {
    let productoBorrar = new Producto().borrar(req.params.id);
    res.send(productoBorrar)
})








module.exports = routerProductos