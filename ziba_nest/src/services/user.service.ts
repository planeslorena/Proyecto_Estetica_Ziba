import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from './db.service';
import * as bcrypt from 'bcryptjs';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import userQueries from './queries/user.queries';
import User from 'src/models/user.dto';


@Injectable()
export class UserService {
    constructor(private dbService: DatabaseService) {
    }
    
    async createUser(user: User):Promise<User> {
        const salt = await bcrypt.genSalt(8);
        const passEncryp = await bcrypt.hash(user.password, salt);

        try {
        const resultQuery: ResultSetHeader = await this.dbService.executeQuery(
            userQueries.insertUser,
            [
                user.mail,
                passEncryp,
                user.name,
                user.dni,
                user.phone,
                user.role
            ],
          );
          return {
            ...user,
            id_user: resultQuery.insertId,
          };
        } catch (error) {
            if (error.errno == 1062) {
                throw new HttpException(
                  'El mail ya esta siendo utilizado por un usuario',
                  HttpStatus.CONFLICT,
                );
            }
            throw new HttpException(
                `Error insertando usuario: ${error.sqlMessage}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}