import { Schema } from 'mongoose';

export const RepuestoSchema = new Schema({
  codigo: { type: String, required: true },
  name: { type: String, required: true },
  marca: { type: String, required: true },
  categoria: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageURL: String,  
});