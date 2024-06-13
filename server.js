import express from 'express'
import morgan from 'morgan'
import { connectDB } from './src/mongoose.js'
import { Tecnologia } from './src/tecnologiaModel.js'
connectDB() // Conectarse a mongoose

const app = express()
const PORT = process.env.PORT ?? 3000
app.disable('x-powered-by')

// Midleware
app.use(express.json())
app.use(morgan('dev'))
// app.use(express.urlencoded({ extended: true }))

// Devuelve un mensaje de bienvenida a la API.
app.get('/', (req, res) => {
  res.status(200).send('Bienvenidos a nuestra API  de Tecnologias')
})

// Devuelve todos los productos. Permite filtrar por categoría mediante query string.
app.get('/productos', (req, res) => {
  const { categoria } = req.query
  // const categoriaSinAcentos = categoria.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  // const query = !categoria ? {} : { categoria: { $regex: new RegExp(`^${categoriaSinAcentos}$`, 'i') } }
  const query = !categoria ? {} : { categoria: { $regex: categoria, $options: 'i' } }

  Tecnologia.find(query)
    .then(productos => {
      res.status(200).json(productos)
    })
    .catch((error) => {
      console.error('Error al obtener productos: ', error)
      res.status(500).send('Error al obtener las peliculas')
    })
})

// Crea un nuevo producto.
app.post('/productos', (req, res) => {
  const nuevoProducto = new Tecnologia(req.body)
  nuevoProducto
    .save()
    .then((productoNuevo) => {
      if (productoNuevo) {
        res.status(201).json(productoNuevo)
      } else {
        res.status(404).send('Error al agregar el producto')
      }
    }).catch((err) => {
      console.error('Error al crear el producto: ', err)
      res.status(500).send('Error al obtener agregar producto')
    })
})

// (las demas rutas de /:id  al final porque me causaban algunois errores con otras rutas)

// -----------Rutas Adicionales----------------
//  Devuelve los productos con un importe mayor al especificado
app.get('/productos/importes/mayor/:importe', (req, res) => {
  const importe = req.params.importe
  const query = !importe ? {} : { importe: { $gt: importe } }
  Tecnologia.find(query)
    .then((productos) => {
      if (productos) {
        res.json(productos)
      } else {
        res.status(404).send('No se encontraron productos con un importe menor a ' + importe)
      }
    })
    .catch((err) => {
      console.error('Error al obtener los productos:', err)
      res.status(500).send('Error al obtener los productos por importe')
    })
})
// Devuelve los productos con un importe menor al especificado.
app.get('/productos/importes/menor/:importe', (req, res) => {
  const importe = req.params.importe
  const query = !importe ? {} : { importe: { $lt: importe } }
  Tecnologia.find(query)
    .then((productos) => {
      if (productos) {
        res.json(productos)
      } else {
        res.status(404).send('No se encontraron productos con un importe menor a ' + importe)
      }
    })
    .catch((err) => {
      console.error('Error al obtener los productos:', err)
      res.status(500).send('Error al obtener los productos por importe')
    })
})
// Devuelve una lista de todas las categorías disponibles
app.get('/productos/categoria/:categoria', (req, res) => {
  const categoria = req.params.categoria
  const query = !categoria ? {} : { categoria: { $regex: categoria, $options: 'i' } }

  Tecnologia.find(query)
    .then((productos) => {
      if (productos) {
        res.json(productos)
      } else {
        res.status(404).send('No se encontraron productos con esa categoria')
      }
    })
    .catch((err) => {
      console.error('Error al obtener los productos:', err)
      res.status(500).send('Error al obtener los productos por categoria')
    })
})
// Devuelve los productos que coinciden con el nombre especificado (búsqueda parcial)
app.get('/productos/buscar', (req, res) => {
  const nombre = req.query.q
  const query = !nombre ? {} : { nombre: { $regex: nombre, $options: 'i' } }

  Tecnologia.find(query)
    .then((productos) => {
      if (productos) {
        res.json(productos)
      } else {
        res.status(404).send('No se encontraron productos con ese nombre')
      }
    })
    .catch((err) => {
      console.error('Error al obtener los productos:', err)
      res.status(500).send('Error al obtener los productos')
    })
})

// Obtener productos por rango de precio
app.get('/productos/rango-precio', (req, res) => {
  const { min, max } = req.query
  const query = { importe: { $gte: min, $lte: max } }
  Tecnologia.find(query)
    .then((peliculas) => {
      res.json(peliculas)
    })
    .catch((error) => {
      console.error('Error al obtener peliculas: ', error)
      res.status(500).send('Error al obtener las peliculas')
    })
})

// Actualizar múltiples productos
app.put('/productos/bulk-update', (req, res) => {
  const { ids, update } = req.body

  Tecnologia.updateMany(
    { _id: { $in: ids } },
    { $set: update }
  )
    .then((result) => {
      console.log(result)
      if (result.modifiedCount === 0) {
        res.status(404).send('No se encontraron productos para actualizar')
      } else {
        res.send(`Se actualizaron ${result.modifiedCount} productos`)
      }
    })
    .catch((err) => {
      console.error('Error al actualizar los productos:', err)
      res.status(500).send('Error al actualizar los productos: ' + err.message)
    })
})

// Eliminar múltiples productos
app.delete('/productos/bulk-delete', (req, res) => {
  const { ids } = req.body

  Tecnologia.deleteMany(
    { _id: { $in: ids } }
  )
    .then((result) => {
      if (result.deletedCount === 0) {
        res.status(404).send('No se encontraron productos para eliminar')
      } else {
        res.send(`Se eliminaron ${result.deletedCount} productos`)
      }
    })
    .catch((err) => {
      console.error('Error al eliminar los productos:', err)
      res.status(500).send('Error al eliminar los productos: ' + err.message)
    })
})

// -----------Rutas de ID-------
// Devuelve un producto por su ID.
app.get('/productos/:id', (req, res) => {
  const { id } = req.params

  Tecnologia.findById(id)
    .then((productos) => {
      if (productos) {
        res.status(200).json(productos)
      } else {
        res.status(404).send('Error al obtener el producto por ID')
      }
    })
    .catch((error) => {
      console.error('Error al obtener el producto: ', error)
      res.status(500).send('Error al obtener el producto')
    })
})
// Elimina un producto por su ID.
app.delete('/productos/:id', (req, res) => {
  const { id } = req.params
  Tecnologia.findByIdAndDelete(id)
    .then((productoEliminado) => {
      if (productoEliminado) {
        res.status(200).json({ message: 'Peli borrada con exito' })
      } else {
        res.status(404).send('Error al eliminar el producto por su ID')
      }
    })
    .catch((err) => {
      console.error('Error al eliminar el producto: ', err)
      res.status(500).send('Error al eliminar el producto')
    })
})
// Actualiza parcialmente un producto por su ID.
app.patch('/productos/:id', (req, res) => {
  const { id } = req.params
  Tecnologia.findByIdAndUpdate(id, req.body, {
    new: true
  })
    .then((producto) => {
      if (producto) {
        res.status(200).json({ message: 'producto actualizado correctamente', producto })
      } else {
        res.status(404).send('Error al actualizar el producto por su ID')
      }
    })
    .catch((error) => {
      console.error('Error al actualizar el producto: ', error)
      res.status(500).send('Error al actualizar el producto')
    })
})
// Actualiza completamente un producto por su ID.
app.put('/productos/:id', (req, res) => {
  const { id } = req.params
  console.log(id)
  Tecnologia.findByIdAndUpdate(id, req.body, {
    new: true,
    overwrite: true
  })
    .then((productoActualizado) => {
      if (productoActualizado) {
        res.json({ message: 'Peli actualizada con exito', productoActualizado })
      } else {
        res.status(404).json({ message: 'Peli no encontrada para actualizar' })
      }
    })
    .catch((error) => {
      console.error('Error al modificar la pelicula: ', error)
      res.status(500).send('Error al actualizar la pelicula')
    })
})

// Middleware para manejar errores 404
app.use((req, res) => {
  res.status(404).send('Error 404: Ruta no encontrada')
})

app.listen(PORT, () => {
  console.log(`Servidor corriendose en el puerto: http://localhost:${PORT}`)
})
