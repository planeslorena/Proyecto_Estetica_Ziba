import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RowDataPacket } from 'mysql2';
import { DatabaseService } from './db.service';
import loginQueries from './queries/login.queries';
import User from 'src/models/user.dto';

@Injectable()
export class LoginService {
  salt: string = '$2a$08$W59jWcwio1TiLx4A8iRyTO';
  constructor(private jwtService: JwtService, private dbService: DatabaseService) {
  }

  async validateUser(username: string, password: string): Promise<User> {
    //obtener de la base de datos el usuario
    const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(
      loginQueries.selectUsuario,
      [username],
    );

    //Si resultQuery esta vacio, es porque no se encontro el usuario o esta deshabilitado
    if (resultQuery.length == 0) {
      throw new HttpException('El usuario no existe o esta deshabilitado', HttpStatus.FORBIDDEN)
    }

    //Esta encriptacion debe estar al momento de guardar la clave en la DB cuando se crea el usuario
    const passEncrip = await bcrypt.hash(resultQuery[0].password, this.salt);

    //Si lo encuentra debo chequear que la contraseña sea la misma
    const passEncriptado = await bcrypt.hash(password, this.salt);
      if (passEncrip == passEncriptado) {
        // retorno el objeto usuario
        return {
          username: username, 
          role: resultQuery[0].role,
          name: resultQuery[0].name,
        };
      }
      return null;
    }

  login(user: User) {
    const payload = { usuario: user };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}