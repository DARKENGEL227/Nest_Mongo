import { Schema } from 'mongoose';

export const UsuarioSchema = new Schema({
  name: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  roles:{ type: String, required: true, default: 'user' },
  phone: String,
  createdAt: { type: Date, default: Date.now },
});
