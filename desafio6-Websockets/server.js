const express = require('express')
const hanblebars = require('express-handlebars')
const fs = require('fs')
const moment = require('moment')
const {Server: HttpServer } = require('http')
const {Server: IOServer } = require('socket.io')
// const routerProductos = require('./routes/productos')
const mensajes = JSON.parse(fs.readFileSync('./api/mensajes.json'))
const productos = JSON.parse(fs.readFileSync('./api/productos.json'))

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('public'))

const PORT = process.env.PORT || 8080

app.set("views", "./views")
app.set("view engine", "hbs")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use('/',routerProductos)

io.on("connection", (socket) => {
    console.log(`Nuevo cliente conectado ${socket.id}`)

    socket.emit("todos-mensajes",mensajes) //envio los mensajes a los clientes
    socket.emit("todos-productos",productos)

    socket.on('mensajeNuevo', (mensaje) => {
        let nowDate = moment().format('DD/MM/YYYY')
        let nowTime = moment().format('HH:mm:ss')
        mensaje.date = nowDate
        mensaje.time = nowTime
        mensajes.push(mensaje)
        fs.writeFileSync('./api/mensajes.json', JSON.stringify(mensajes))
        io.sockets.emit('cargar-nuevo-mensaje',[mensaje])
    })

    socket.on('productoNuevo', (producto) => {
        producto.id = productos.length + 1
        productos.push(producto)
        console.log('llegue aca wachin')
        fs.writeFileSync('./api/productos.json', JSON.stringify(productos))
        io.sockets.emit('cargar-nuevo-producto',[producto])
    })
})

const server = httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
server.on('error', (error) => {
    console.error(`Error in server ${error}`)
})