import mongoose from 'mongoose'
process.loadEnvFile()

// Obtenemos la URI  de las variables de entorno
const URI = process.env.MONGODB_URLSTRING
const DATABASE_NAME = process.env.DATABASE_NAME

// Conectar a MongoDB usando Mongoose
export const connectDB = async () => {
  try {
    await mongoose
      .connect(URI + DATABASE_NAME)
    return console.log('Conectado a MongoDB')
  } catch (err) {
    return console.log('Error al conectarse : ', err)
  }
}

// con then y cath
// const connectDB = () => {
//   return mongoose
//     .connect(URI + DATABASE_NAME)
//     .then(() => console.log('Conectado a MongoDB'))
//     .catch((err) => console.log('Error al conectarse : ', err))
// }
