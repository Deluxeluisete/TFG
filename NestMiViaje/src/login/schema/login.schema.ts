import * as mongoose from 'mongoose';

export const LoginSchema = new mongoose.Schema({
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
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
  },
  telefono: {
    type: String,
    match: /^\+(?:[0-9] ?){6,14}[0-9]$/,
    unique: true,
  },
  nacimiento: {
    type: Date,
  },
  admin: {
    type: Boolean,
    required: true,
  },
});
