const socket = io.connect()

var templateProductos = Handlebars.compile(`
        {{#each productos}}
        <tr>
          <td>{{this.id}}</td>
          <td>{{this.title}}</td>
          <td>{{this.price}}</td>
          <td> <img src=" {{this.thumbnail}}" class = "img-responsive" width = "4%"> </td>
        </tr>
        {{/each}}
`)

var templateMensajes = Handlebars.compile(`
    {{# each mensajes }}
    <p style="color:brown;"><b style="color:blue;"> {{ this.username }}</b> [{{ this.date }} {{ this.time }}] : <i style="color:green;"> {{ this.mensaje }}</i></p>
    {{/each}}
`)

// ******** | Productos | ******************
function renderizarProductos(productos) {
    let elHtml = templateProductos({productos:productos});
    document.getElementById("tablaProductos").innerHTML = elHtml
}

function renderizarUnProducto(data) {
    let elHtml = templateProductos({productos:data});
    document.getElementById("tablaProductos").append = elHtml
}

socket.on("todos-productos", (productos) => {
    renderizarProductos(productos)
});

socket.on('cargar-nuevo-producto', (data) => {
    renderizarUnProducto(data)
})

function enviarProducto() {
    const title = document.getElementById("title");
    const price = document.getElementById("price");
    const thumbnail = document.getElementById("thumbnail");
  
    socket.emit("productoNuevo", { title: title.value, price: price.value , thumbnail: thumbnail.value});
    title.value = "";
    price.value = "";
    thumbnail.value = "";
    return false; //para que no siga el evento y no quede en loop
}

// ******** | Mensajes | ******************
function renderizarMensajes(mensajes) {
    let elHtml = templateMensajes({mensajes:mensajes});
    document.getElementById("listaMensajes").innerHTML = elHtml
}

function renderizarUnMensaje(data) {
    let elHtml = templateMensajes({mensajes:data});
    document.getElementById("listaMensajes").append = elHtml
}
  
socket.on("todos-mensajes", (mensajes) => {
    renderizarMensajes(mensajes)
});

socket.on('cargar-nuevo-mensaje', (data) => {
    renderizarUnMensaje(data)
})

function enviarMensaje() {
    const usuario = document.getElementById("username");
    const mensaje = document.getElementById("mensaje");
  
    if (!usuario.value || !mensaje.value) {
      alert("Debe completar los campos");
      return false;
    }
  
    socket.emit("mensajeNuevo", { username: usuario.value, mensaje: mensaje.value });
    mensaje.value = "";
    return false; //para que no siga el evento y no quede en loop
}