import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from './interfaces/usuario.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel('Usuario') private readonly usuarioModel: Model<Usuario>,
    private jwtService: JwtService,
  ) {}

 async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario>{
  try {
  //   const usuariobyEmail = await this.usuarioModel.findOne({ email: createUsuarioDto.email });

  // if (usuariobyEmail) {
  //   throw new HttpException('El correo ya existe Use ortro', HttpStatus.NOT_ACCEPTABLE);
  // }
    const encriptedPassword = await bcrypt.hash(createUsuarioDto.password, 10);
      const newUsuario = new this.usuarioModel({
        ...createUsuarioDto,
        password: encriptedPassword,
      });
      
      return await newUsuario.save();
  } catch (error) {
    throw new HttpException('Datos incorrecto', HttpStatus.NOT_ACCEPTABLE);
  }
  }
  
  async loginUsuario(email: string, password: string) {
    try {
      //buscar que el correo existe en la base de datos
      const usuariol = await this.usuarioModel.findOne({ email });
      const isPasswordValid = await bcrypt.compare(password, usuariol.password);
      if (!isPasswordValid) {
        throw new HttpException(
          'Contrasena incorrecta',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
      if (usuariol && isPasswordValid) {
          const payload = {
          sub: usuariol._id,
          email: usuariol.email,
          name: usuariol.name,
          roles: usuariol.roles,
        };
        return { access_token: await this.jwtService.signAsync(payload) };
      }
    } catch (error) {
      throw new HttpException(
        'Datos no encontrados o incorrectos',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  findAll() {
    return `This action returns all usuario`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
