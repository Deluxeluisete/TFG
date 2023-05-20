import * as mongoose from 'mongoose';
export const LoginSchemaC = new mongoose.Schema({
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
