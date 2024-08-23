import { Module } from '@nestjs/common';
import { ListaRepuestosService } from './lista-repuestos.service';
import { ListaRepuestosController } from './lista-repuestos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RepuestoSchema } from './schemas/lista-repuestos.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Repuesto', schema: RepuestoSchema }])
  ],
  providers: [ListaRepuestosService],
  controllers: [ListaRepuestosController]
})
export class ListaRepuestosModule {}
