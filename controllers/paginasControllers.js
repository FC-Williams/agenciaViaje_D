import { Viaje } from "../models/Viajes.js";
import { Testimonial } from "../models/Testimoniales.js";

const paginaInicio = async (req, res) => {
    // Consultar solo 3 viajes del modelo Viaje

    const promiseDB = []
    promiseDB.push(Viaje.findAll({ limit: 3 }))
    promiseDB.push(Testimonial.findAll({ limit: 3 }))
    try {
        const resultado = await Promise.all(promiseDB)
        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.log(error)
    }
}

const paginaNosotros = (req, res) => {
    // Insertar variables a la vista HTML (o PUG)
    // const viajes = 'Viaje a alemania'
    // la variable se tiene que pasar en un objeto como parametro de render, para ser usado en nosotros.pug
    // res.render('nosotros', {
    //     viajes
    // });

    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res) => {
    // Consultar la BD
    const viajes = await Viaje.findAll()
    console.log(viajes)

    res.render('viajes', {
        pagina: 'Próximos viajes',
        viajes
    });
}

const paginaTestimoniales = async (req, res) => {

    try {
        const testimoniales = await Testimonial.findAll()
        console.log(testimoniales)
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error)
    }

}

// Muestra un viaje por su slug

const paginaDetalleViaje = async (req, res) => {
    const { slug } = req.params
    try {
        const viaje = await Viaje.findOne({ where: { slug } })
        res.render('viaje', {
            pagina: 'Información viaje',
            viaje
        })
    } catch (error) {
        console.log(error)
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}