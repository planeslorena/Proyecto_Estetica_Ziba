import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import User from 'src/models/user.dto';
import { UserService } from './user.service';

@Injectable()
export class LoginService {
  constructor(private jwtService: JwtService, private userService: UserService) {
  }

  async validateUser(username: string, password: string): Promise<any> {

    //obtengo el usuario de la base de datos buscando por mail
    const user: User = await this.userService.getUserByMail(username);

    if (!user) {
      //si user no existe es porque el usuario no existe o esta deshabilitado, genero el error
      throw new HttpException('El usuario no existe o esta deshabilitado', HttpStatus.FORBIDDEN)
    }

    //Si lo encuentra debo chequear que la contraseña sea la misma
    if (await bcrypt.compare(password, user.password)) {
      // retorno el objeto usuario
      return {
        username: username,
        role: user.role,
        name: user.name,
      };
    }
    return null;
  }

  login(user: any) {
    //Genero el payload para crear el token
    const payload = { usuario: user };
    //Genero el token y lo retorno
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}