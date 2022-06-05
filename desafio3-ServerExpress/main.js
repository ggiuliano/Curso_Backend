const express = require('express')
const fs = require('fs')
const contenedor = require ('./contenedor')

var app = express()
const ContenedorProductos = new contenedor('productos')

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Escuchando en puerto ${PORT}`)
})

app.get('/', (req, res) => {
    res.send("root page")
})

app.get('/productos', async (req,res) =>{

    try {
        let listadoProductos = await ContenedorProductos.getAll()

        res.send(listadoProductos)
    } catch(error){
        res.send(error)
    }

})

app.get('/productoRandom', async (req,res) =>{
    let data = await ContenedorProductos.getAll()
    let totalItems = data.length - 1; //calculo total de items en file\
    let randomItem = parseInt(Math.random() * (totalItems - 0 + 1) + 0); //saco un numero random entre 1 y el total de items
    let productoRandom = data[randomItem]; //busco el titulo del item que calcule

    let resultado = {
        "item": productoRandom
    }

    res.send(resultado);

})