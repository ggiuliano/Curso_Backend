const express = require ('express')
const routerProductos = require('./routes/productos.js')

const app = express()


routerProductos.use(express.json())
routerProductos.use(express.urlencoded({extended:true}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/productos',routerProductos)
app.use('/',express.static(__dirname + '/public'))


const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en ${PORT}`)
})
server.on('error',error => console.log(`Error en servidor ${error}`))