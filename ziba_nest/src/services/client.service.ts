import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from './db.service';
import Client from 'src/models/client.dto';
import * as bcrypt from 'bcryptjs';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import clientQueries from './queries/client.queries';


@Injectable()
export class ClientService {
    constructor(private dbService: DatabaseService) {
    }
    
    async createClient(client: Client):Promise<Client> {
        const salt = await bcrypt.genSalt(8);
        const passEncryp = await bcrypt.hash(client.password, salt);

        try {
        const resultQuery: ResultSetHeader = await this.dbService.executeQuery(
            clientQueries.insertUser,
            [
                client.mail,
                passEncryp,
                client.name
            ],
          );
          return {
            ...client,
            id_client: resultQuery.insertId,
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