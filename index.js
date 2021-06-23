// Aqui se configura express, como si fuera apache en PHP
// Requerimos express
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv';
dotenv.config({ path: "variables.env" });
// Asignamos a app como una funcion
const app = express()

// Conectar la BD
db.authenticate()
    .then(() => console.log('BD conectada'))
    .catch(error => console.log(error))

// Habilitar PUG
app.set('view engine', 'pug')

// Obtener el año actual
app.use((req, res, next) => {
    const year = new Date()
    res.locals.actualYear = year.getFullYear()
    res.locals.nombreSitio = 'Agencia de viajes'
    // Lleva return next() para que se pase forzadamente al proximo middleware, pero puede quedar solo con next()
    return next()
})

// Agregar bodyParser para poder leer los verbos POST 
app.use(express.urlencoded({extended: true}))

// Definir la carpeta public
app.use(express.static('public'))
app.use('/viajes', express.static('public'));

// Agregar router
// use soporta todos los verbos de una api
// añade router con todos los verbos que contenga a la pagina principal (/)
app.use('/', router)


// Se define el puerto, se usa una variable local de Node, 
// Para ello necesitamos un archivo de variables de entorno, pero como no exixte ese archivo, toma el puerto 4000
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || '3000';

// Se arranca el servidor con .listen, se le pasa el puerto y una callback
app.listen(port, host, ()=>{
    console.log('El servidor esta funcionando')
})