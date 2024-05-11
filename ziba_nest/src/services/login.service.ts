import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RowDataPacket } from 'mysql2';
import { DatabaseService } from './db.service';
import loginQueries from './queries/login.queries';

@Injectable()
export class LoginService {
  salt: string = '$2a$08$W59jWcwio1TiLx4A8iRyTO';
  joseHash: string;
  constructor(private jwtService: JwtService, private dbService: DatabaseService) {
    this.genSalt();
  }

  async genSalt() {
    this.joseHash = await bcrypt.hash('jose', this.salt);
  }

  async validateUser(username: string, password: string): Promise<any> {
    //obtener de la base de datos el usuario
    const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(
      loginQueries.selectUsuario,
      [username],
    );

    //Si resultQuery esta vacio, es porque no se encontro el usuario o esta deshabilitado
    if (resultQuery.length == 0) {
      throw new HttpException('El usuario no existe o fue deshabilitado', HttpStatus.FORBIDDEN)
    }
    console.log(resultQuery);

    //Si lo encuentra debo chequear que la contraseña sea la misma
    if (username.toLowerCase === resultQuery['usuario']) {
      const passEncriptado = await bcrypt.hash(password, this.salt);
      if (this.joseHash == passEncriptado) {
        // retorno el objeto usuario
        return {
          username: username,
          role: 'ADMIN',
          nombre: 'Jose Eyler',
        };
      }
      return null;
    }
    return null;
  }

  login(user: any) {
    const payload = { usuario: user };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}