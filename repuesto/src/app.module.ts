import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ListaRepuestosModule } from './lista-repuestos/lista-repuestos.module';
import { UsuarioModule } from './usuario/usuario.module';
import { UsuarioGuard } from './usuario/usuario.guard';
import { RolesGuard } from './usuario/roles/roles.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot( `${process.env.MONGODB_URL}`|| 'mongodb://localhost:27017/repuestos'),
    ListaRepuestosModule,
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [AppService,
  {
    provide: 'APP_GUARD',
    useClass: UsuarioGuard,
  },
  {
    provide: 'APP_GUARD',
    useClass: RolesGuard,}
  ],
})
export class AppModule {}
