const fs = require ('fs')

class Contenedor {

    constructor (unNombre) {
        this.archivo = unNombre + '.txt';
    }


    async save (unTitle, unPrice, unThumbnail) {

        let leoFile
        let listado = []
        try{
            leoFile = await fs.promises.readFile(__dirname + '/' + this.archivo, 'utf-8');
        }
        catch (error) {
            console.log("El archivo " + this.archivo + " no existe");
        }

        if (leoFile.length == 0){
            let nuevoProducto = {
                "title" : unTitle,
                "price" : unPrice,
                "thumbnail" : unThumbnail,
                "id" : listado.length + 1,
            }
            listado.push(nuevoProducto)

            
            try {
                await fs.promises.writeFile(__dirname + '/' + this.archivo, JSON.stringify(listado,null,'\t'));
                console.log("nuevo producto agregado! | ID:" + nuevoProducto.id);
            }
            catch (error) {
                console.log("error, no se pudo escribir archivo");
            }
        }else{
            
            listado = JSON.parse(leoFile)

            
            let nuevoProducto = {
                "title" : unTitle,
                "price" : unPrice,
                "thumbnail" : unThumbnail,
                "id" : listado.length + 1,
            }
            listado.push(nuevoProducto)

            
            try {
                await fs.promises.writeFile(__dirname + '/' + this.archivo, JSON.stringify(listado,null,'\t'));
                console.log("nuevo producto agregado! | ID:" + nuevoProducto.id);
            }
            catch (error) {
                console.log("error, no se pudo escribir archivo");
            }
        }

    }

    async getById (unId) {
        let leoFile
        let listadoObjetos

        
        try{
            leoFile = await fs.promises.readFile(__dirname + '/' + this.archivo, 'utf-8');
        }
        catch (error) {
            console.log("El archivo " + this.archivo + " no existe");
        }

        
        listadoObjetos = JSON.parse(leoFile)

        
        let producto = listadoObjetos.find(x => x.id === unId)

        
        if (producto === undefined){
            console.log('null')
        }else{
            console.log(producto)
        }

    }

    async getAll () {
        let leoFile
        let listadoObjetos

        
        try{
            leoFile = await fs.promises.readFile(__dirname + '/' + this.archivo, 'utf-8');
        }
        catch (error) {
            console.log("El archivo " + this.archivo + " no existe");
        }

        
        listadoObjetos = JSON.parse(leoFile)

        
        console.log(listadoObjetos)
    }

    async deleteById (unId) {
        let leoFile
        let listadoObjetos

        
        try{
            leoFile = await fs.promises.readFile(__dirname + '/' + this.archivo, 'utf-8');
        }
        catch (error) {
            console.log("El archivo " + this.archivo + " no existe");
        }

        
        listadoObjetos = JSON.parse(leoFile)

        let indexProducto = listadoObjetos.findIndex(function(o){
            return o.id === unId
        })

        if (indexProducto !== -1){
            listadoObjetos.splice(indexProducto,1);
        }

        try {
            await fs.promises.writeFile(__dirname + '/' + this.archivo, JSON.stringify(listadoObjetos,null,'\t'));
        }
        catch (error) {
            console.log("error, no se pudo eliminar producto del archivo");
        }

    }

    async deleteAll () {
        
        try {
            await fs.promises.writeFile(__dirname + '/' + this.archivo,'');
            console.log("Los productos fueron eliminados del archivo");
        }
        catch (error) {
            console.log("error, no se pudo borrar contenido del archivo");
        }
    }

}



// ---| Test del codigo |---
let prueba = new Contenedor("productos");

//funcion save
//prueba.save("birome",50,"http://birome.png");

//funcion getById
//prueba.getById(5);

//funcion getAll
//prueba.getAll();

//funcion deteleById
//prueba.deleteById(5)

//funcion deleteAll
//prueba.deleteAll()