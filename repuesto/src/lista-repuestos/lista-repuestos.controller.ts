import { Controller,Get, Put,Delete,Post, Body,Res, HttpStatus, Param, Query, NotFoundException } from '@nestjs/common';
import { ListaRepuestosService } from './lista-repuestos.service';
import { CreateRepuestoDTO } from './dto/lista-repuestos.dto';

@Controller('lista-repuestos')
export class ListaRepuestosController {
    constructor(private ListaRepuestosService: ListaRepuestosService) {}

  //Get All
  @Get('/')
  async getAll(@Res() res) {
    const repuesto = await this.ListaRepuestosService.getListaRepuestos();
    return res.status(HttpStatus.OK).json({
      message: 'Todos los productos enviados',
      repuesto,
    });
  }

  //Get one
  @Get('/:id')
  async getid(@Res() res, @Param('id') id: string) {
    const repuesto = await this.ListaRepuestosService.getRepuesto(id);
    if (!repuesto) {
      throw new NotFoundException('Item solicitado NO encontrado');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Item encontrado',
      repuesto,
    });
  } 

  //Create Post
  @Post('/crear')
  async crearR(@Res() res, @Body() RepuestoCredo: CreateRepuestoDTO) {
    const repuesto = await this.ListaRepuestosService.crearRepuesto(RepuestoCredo);
    return res.status(HttpStatus.OK).json({
      message: 'Item creado correctamente',
      repuesto,
    });
  }

  //Put Update
  @Put('/upgrade')
  async updateR( @Res() res, @Body() RespuestoUp: CreateRepuestoDTO, @Query('id') repuestoId,  ) {
    const repuesto = await this.ListaRepuestosService.updateRepuesto(
      repuestoId,
      RespuestoUp,
    );
    if (!repuesto) {
      throw new NotFoundException('Item por actualizar NO encontrado');
    }
    return res.status(HttpStatus.ACCEPTED).json({
      message: 'Item actualizado correctamente',
      repuesto,
    });
  }

  //Delete de Repuesto
  @Delete('/borrar')
  async BorrarR(@Res() res, @Query('id') id: string) {
    const repuesto = await this.ListaRepuestosService.BorrarRepuesto(id);
    if (!repuesto) {
      throw new NotFoundException('Item NO encontrado para eliminar');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Item eliminado correctamente',
      repuesto,
    });
  } 

}
