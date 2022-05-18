class Usuario {
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        let nombreApellido = this.nombre + " " + this.apellido
        console.log(`${nombreApellido}`)
    }

    addMascota(mascota){
        let nuevaMascota = mascota;
        this.mascotas.push(nuevaMascota)
    }

    countMascotas(){
        let cantMascotas = this.mascotas.length;
        console.log(cantMascotas)
    }

    addBook(titulo, autor){
        let nuevoLibro = {"nombre": titulo, "autor": autor};
        this.libros.push(nuevoLibro);
    }

    getBooks(){
        let listado = this.libros.map(a => a.nombre);
        console.log(listado)
    }
}

//instancio la clase
let ejemplo2 = new Usuario("Gustavo", "Giuliano", [{nombre: "el señor de los anillos", autor:"JRR Tolkien"}], ["gato"])

//test de los metodos
ejemplo2.getFullName();
ejemplo2.addMascota("perro")
ejemplo2.countMascotas()
ejemplo2.addBook("el codigo da vinci", "dan Brown")
ejemplo2.getBooks()
