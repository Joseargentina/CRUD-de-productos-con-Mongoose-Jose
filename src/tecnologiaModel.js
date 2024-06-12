import mongoose from 'mongoose'

// Definir el esquema y el modelo de Mongoose
const tecnologiaSchema = new mongoose.Schema({
  title: String,
  year: Number,
  director: String,
  duration: Number,
  poster: String,
  rate: Number
})

export const Tecnologia = mongoose.model('Tecnologia', tecnologiaSchema)
