const express = require('express')
const hanblebars = require('express-handlebars')
const routerProductos = require('./routes/productos')

const app = express()

const PORT = process.env.PORT || 8080

app.engine(
    "hbs",
    hanblebars.engine({
        extname: ".hbs",
        defaultLayout: "layout.hbs"
    })
)

app.set("views", "./views")
app.set("view engine", "hbs")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/',routerProductos)

app.get('/',(req,res) => {
    res.render('form_producto')
})

app.listen(PORT, () => `Server running on port ${PORT}`)