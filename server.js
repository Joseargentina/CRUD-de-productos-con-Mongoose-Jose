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

// Devuelve un mensaje de bienvenida a la API.
app.get('/', (req, res) => {
  res.status(200).send('Bienvenidos a nuestra API  de Tecnologias')
})

// Devuelve todos los productos. Permite filtrar por categoría mediante query string.
app.get('/productos', (req, res) => {
  const { categoria } = req.query
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

// Devuelve un producto por su ID.
// app.get('/productos/:id'), (req, res) => {}

// Crea un nuevo producto.
// app.post('/productos'), (req, res) => {}

// Crea un nuevo producto.
// app.post('/productos'), (req, res) => {}

// Actualiza parcialmente un producto por su ID.
// app.patch('/productos/:id'), (req, res) => {}

// Actualiza completamente un producto por su ID.
// app.put('/productos/:id'), (req, res) => {}

// Elimina un producto por su ID.
// app.delete('/productos/:id'), (req, res) => {}

// Middleware para manejar errores 404
app.use((req, res) => {
  res.status(404).send('Error 404: Ruta no encontrada')
})

app.listen(PORT, () => {
  console.log(`Servidor corriendose en el puerto: http://localhost:${PORT}`)
})
