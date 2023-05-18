import * as mongoose from 'mongoose';
import { LoginSchema } from 'src/login/schema/login.schema';

export const ComentarioSchema = new mongoose.Schema({
  tematica: {
    type: String,
    required: true,
  },
  mensaje: {
    type: String,
    required: true,
  },
  Usuario: [LoginSchema],
});
