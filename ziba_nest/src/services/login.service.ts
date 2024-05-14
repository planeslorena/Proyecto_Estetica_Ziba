import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RowDataPacket } from 'mysql2';
import { DatabaseService } from './db.service';
import loginQueries from './queries/login.queries';
import User from 'src/models/user.dto';

@Injectable()
export class LoginService {
  constructor(private jwtService: JwtService, private dbService: DatabaseService) {
  }

  async validateUser(username: string, password: string): Promise<User> {
    //obtener de la base de datos el usuario
    const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(
      loginQueries.selectUser,
      [username],
    );

    //Si resultQuery esta vacio, es porque no se encontro el usuario o esta deshabilitado
    if (resultQuery.length == 0) {
      throw new HttpException('El usuario no existe o esta deshabilitado', HttpStatus.FORBIDDEN)
    }

    //Si lo encuentra debo chequear que la contraseña sea la misma
      if (await bcrypt.compare(password,resultQuery[0].password)) {
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