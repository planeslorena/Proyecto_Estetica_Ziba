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

    async getUserByMail(mail: string): Promise<User> {
        //Obtengo el usuario consultado de la base de datos filtrando por mail
        const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(
            userQueries.selectUserByMail,
            [mail],
        );

        //Si no encuentro el usuario retorno null
        if (resultQuery.length == 0) {
            return null;
        //sino retorno el User
        } else {
            return {
                mail: resultQuery[0].mail, 
                password: resultQuery[0].password,
                role: resultQuery[0].role,
                name: resultQuery[0].name,
                dni:resultQuery[0].dni,
                phone: resultQuery[0].phone,
            };
        }
    }

    async createUser(user: User): Promise<User> {
        //Encripto la contraseña que me llega de la registración
        const salt = await bcrypt.genSalt(8);
        const passEncryp = await bcrypt.hash(user.password, salt);

        //Acomodo los datos para insertarlos en la DB
        user = {
            ...user,
            mail: user.mail.toLocaleLowerCase(), //pongo el mail todo en minuscula
            password: passEncryp,
            name: user.name.toUpperCase(),
        }

        //Inserto la info en la DB
        try {
            const resultQuery: ResultSetHeader = await this.dbService.executeQuery(
                userQueries.insertUser,
                [
                    user.mail,
                    user.password,
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
            //Si la DB retorna el error 1062 quiere decir que el mail ya existe en la misma
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