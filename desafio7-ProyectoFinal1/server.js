//Libs
const express = require('express')

//Routers
const routerProductos = require('./routes/productos')
const routerCarritos = require('./routes/carrito')


const app = express()

routerProductos.use(express.json())
routerProductos.use(express.urlencoded({extended:true}))

routerCarritos.use(express.json())
routerCarritos.use(express.urlencoded({extended:true}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/productos',routerProductos)
app.use('/api/carrito',routerCarritos)



const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`Server listening in ${PORT}`)
})
server.on('error', error => console.log(`Error in Server ${error}`))
