import { Test, TestingModule } from '@nestjs/testing';
import { ListaRepuestosController } from './lista-repuestos.controller';

describe('ListaRepuestosController', () => {
  let controller: ListaRepuestosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListaRepuestosController],
    }).compile();

    controller = module.get<ListaRepuestosController>(ListaRepuestosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
