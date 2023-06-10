import * as mongoose from 'mongoose';
//esquema de usuario para los comentarios , se usa este pq hay cosas que cambian respecto al otro
export const LoginSchemaC = new mongoose.Schema({
  imagen: {
    type: String,
  },
  nombre: {
    type: String,
    required: true,
  },
  apellidos: {
    type: String,
    required: true,
  },
  contrasena: {
    type: String,
    required: true,
    minlength: 8,
  },
  email: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
  },
  telefono: {
    type: String,
    match: /^\+(?:[0-9] ?){6,14}[0-9]$/,
  },
  nacimiento: {
    type: Date,
  },
});
//Esquema para los comentarios
export const ComentarioSchema = new mongoose.Schema({
  tematica: {
    type: String,
    required: true,
  },
  mensaje: {
    type: String,
    required: true,
  },
  Usuario: [LoginSchemaC],
});
