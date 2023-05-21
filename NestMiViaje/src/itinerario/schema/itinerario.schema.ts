import * as mongoose from 'mongoose';

export const ItinerarioSchema = new mongoose.Schema({
  datos: {
    type: String,
    required: true,
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
  destino: {
    type: String,
    required: true,
  },
  desde: {
    type: Date,
  },
  hasta: {
    type: Date,
  },
});
