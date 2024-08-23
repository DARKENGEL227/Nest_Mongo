import { Test, TestingModule } from '@nestjs/testing';
import { ListaRepuestosService } from './lista-repuestos.service';

describe('ListaRepuestosService', () => {
  let service: ListaRepuestosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListaRepuestosService],
    }).compile();

    service = module.get<ListaRepuestosService>(ListaRepuestosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
