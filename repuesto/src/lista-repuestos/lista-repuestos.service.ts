import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose'; 
import { Repuesto } from './interfaces/lista-repuestos.interfaces';
import { CreateRepuestoDTO } from './dto/lista-repuestos.dto'; 

@Injectable()
export class ListaRepuestosService {
    constructor(
        @InjectModel('Repuesto') private readonly RepuestoModel: Model<Repuesto>,
      ) {}

// Obtener lista de  Repuestos
      async getListaRepuestos(): Promise<Repuesto[]> {
        const products = await this.RepuestoModel.find();
        return products;
      }
    
//Obtener un Repuesto
      async getRepuesto(id: string): Promise<Repuesto> {
        const product = await this.RepuestoModel.findById(id);
        return product;
      }
    
//Añadir un Repuesto
      async crearRepuesto(Repuesto: CreateRepuestoDTO): Promise<Repuesto> {
        const newRepuesto = new this.RepuestoModel(Repuesto);
        return await newRepuesto.save();
      } 
    
//Actualizar un Repuesto
      async updateRepuesto(id: string, RepuestoUpgraded: CreateRepuestoDTO,): Promise<Repuesto> {
        const Repuesto = await this.RepuestoModel.findByIdAndUpdate(id,RepuestoUpgraded,{ new: true },);    
        return Repuesto;
      }  
//Eliminar un Repuesto
      async BorrarRepuesto(id: string): Promise<Repuesto> {
        const Repuesto = await this.RepuestoModel.findByIdAndDelete(id);
        return Repuesto;
      }

}
