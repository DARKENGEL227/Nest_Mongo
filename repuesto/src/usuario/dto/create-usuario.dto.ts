import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(10)
  readonly password: string;

  @IsString()
  readonly roles: string;

  @IsString()
  readonly phone: string;
}