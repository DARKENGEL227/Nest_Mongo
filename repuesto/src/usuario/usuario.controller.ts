import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards  } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Public,Roles } from './decorators';
import { Role } from "./rol.enum";


@Controller('Usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}
 // @Roles(Role.admin)
@Public()
  @Post('/registro')
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  } 

  @Public()
  @Post('/login')
  login(@Body() createUserDto: CreateUsuarioDto) {
    const { email, password } = createUserDto;
    return this.usuarioService.loginUsuario(email, password);
  }
  //@UseGuards(UsuarioGuard)
  @Roles(Role.user,Role.admin)
  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }
  @Roles(Role.user,Role.admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }
  @Roles(Role.admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }
  @Roles(Role.admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}
