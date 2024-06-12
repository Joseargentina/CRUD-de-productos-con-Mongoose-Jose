import mongoose from 'mongoose'

// Definir el esquema y el modelo de Mongoose
const tecnologiaSchema = new mongoose.Schema({
  nombre: String,
  importe: Number,
  categoria: String
})

export const Tecnologia = mongoose.model('Tecnologia', tecnologiaSchema)
