const express = require('express');
const fs = require('fs');
//const { request } = require('http');

const app = express();

class Contenedor {
    constructor(nombreArchivo, productos) {
        this.nombreArchivo = nombreArchivo;
        this.productos = [];

    }

    getId(){
        const length = this.productos.length;

        if(length == 0){
            return 0
        }
        return this.productos.length
    };


    async save(){

        const idProd = this.getId();
        
        this.productos.push(
            {id : idProd +1}
        )
        try {
            await fs.writeFile(this.nombreArchivo, JSON.stringify(this.productos, null, 2))
        } catch (error) {
            throw new Error(error);
        }
    };

    geyById(id) {
        this.productos.find((e) => e.id === id)
        if(e.id === id){
            console.log('Id encontrado')
        }else {
            console.log('Error realacionado al id')
        }
    }

    async getAll (){
        await this.productos
        try {
            console.log(this.productos)
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll(){
        await fs.unlink('./productos.txt')
        try {
            console.log('Se elimino el archivo')
        } catch (error) {
            console.log(error)
        }
    };
    
}

const guardar = new Contenedor('./productos.txt');

guardar.save({"title" : "title 6", "price" : 600, "thumbnail" :"./pintura2.jpg"});
guardar.save({"title" : "title 6", "price" : 600, "thumbnail" :"./pintura2.jpg"});
guardar.save({"title" : "title 6", "price" : 600, "thumbnail" :"./pintura2.jpg"});


app.get('/', (req, res) => {
    res.send('<h1>Welcome!</h1>');
});

app.get('/productos', async (req, res) => {
    const Productos = await guardar.getAll();
    try {
        res.send(Productos)
    } catch (error) {
        res.send('Error al traer todos los productos' + error)
    }
});

app.get('/ProductoRandom', async (req, res) => {
    const nAleatorio = parseInt((Math.random() * 7) + 1)
    const pAleatorio = await guardar.getId(nAleatorio)
    try {
        res.send(pAleatorio)
    } catch (error) {
        res.send('Error al tirar producto random' + error)
    };
});



const server = app.listen(8080, () => {
    console.log('Listen on port 8080')
});