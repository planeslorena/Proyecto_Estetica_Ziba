import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from '../common/services/db.service';
import * as bcrypt from 'bcryptjs';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import userQueries from './queries/user.queries';
import User from 'src/models/user.dto';


@Injectable()
export class UserService {
    constructor(private dbService: DatabaseService) {
    }

    //Pasar el nombre y apellido con la primera letra mayuscula
    fixNameAndLastname = (text: string): string => {
        const arrayText = text.split(" ");

        for (let i = 0; i < arrayText.length; i++) {
            arrayText[i] = arrayText[i].charAt(0).toUpperCase() + arrayText[i].substring(1).toLowerCase();
        }
        return arrayText.join(" ");
    }

    async getAllClients(): Promise<any> {
        //Se obtienen todos los usuarios con rol Client
        const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(
            userQueries.selectAllClients,
            [],
        );
        const result = resultQuery.map((rs: RowDataPacket) => {
            return {
                id: rs['id_user'],
                name: rs['name'],
                lastname: rs['lastname'],
                dni: rs['dni'],
                phone: rs['phone'],
                mail: rs['mail'],
            };
        });
        return result;
    }

    async getAllProf(): Promise<any> {
        //Se obtienen todos los profesionales
        const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(
            userQueries.selectAllProf,
            [],
        );
        const result = resultQuery.map((rs: RowDataPacket) => {
            return {
                id: rs['id_professional'],
                name: rs['name'],
                lastname: rs['lastname'],
                dni: rs['dni'],
                phone: rs['phone'],
                mail: rs['mail'],
                speciality: rs['speciality'],
                calendar: ''
            };
        });

        //luego obtengo la agenda para cada profesional
        const resultQuery2: RowDataPacket[] = await this.dbService.executeSelect(
            userQueries.selectProfessionalCalendar,
            [],
        );

        resultQuery2.map((rs: RowDataPacket) => {
            result.map((se) => {
                if (rs['id_professional'] == se.id) {
                    se.calendar = `${se.calendar}
                     ${rs['week_day']} de ${rs['hour_begin'].substring(0, 5)} a ${rs['hour_end'].substring(0, 5)}`
                }
            })
        });
        return result;
    }


    async getUserByMail(mail: string): Promise<User> {
        //Se obtiene el usuario de la base de datos filtrando por mail
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
                role: resultQuery[0].role,
                name: resultQuery[0].name,
                lastname: resultQuery[0].lastname,
                dni: resultQuery[0].dni,
                phone: resultQuery[0].phone,
            };
        }
    }

    async createUser(user: User): Promise<number> {
        //Se encripta la contraseña que llega de la registración
        const salt = await bcrypt.genSalt(8);
        const passEncryp = await bcrypt.hash(user.password, salt);

        //Se acomodan los datos para insertarlos en la DB
        user = {
            ...user,
            mail: user.mail.toLocaleLowerCase(), //pongo el mail todo en minuscula
            password: passEncryp, //se carga contraseña encriptada
            name: this.fixNameAndLastname(user.name),
            lastname: this.fixNameAndLastname(user.lastname),
        }

        //Se inserta la info en la DB
        try {
            const resultQuery = await this.dbService.executeQuery(
                userQueries.insertUser,
                [
                    user.mail,
                    user.password,
                    user.name,
                    user.lastname,
                    user.dni,
                    user.phone,
                    user.role
                ],
            );
            return resultQuery.insertId
                ;
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

    async createProf(data: any): Promise<string> {

        //Primero se manda a crear el usuario del profesional
        const user = {
            mail: data.mail,
            password: data.password,
            name: data.name,
            lastname: data.lastname,
            dni: data.dni,
            phone: data.phone,
            role: data.role
        }

        const id_user = this.createUser(user);

        //Luego se crea el profesional
        const prof = {
            id_user: id_user,
            id_speciality: data.id_speciality
        }

        //Se inserta el profesional en la tabla de profesionales
        try {
            const resultQuery = await this.dbService.executeQuery(
                userQueries.insertProf,
                [
                    prof.id_user,
                    prof.id_speciality
                ],
            );

            const id_professional = resultQuery.insertId;

        } catch (error) {
            throw new HttpException(
                `Error insertando profesional: ${error.sqlMessage}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        //Por ultimo se crea la agenda del profesional


        return 'Profesional creado con exito'
    }

    async updateUser(user: User): Promise<string> {
        //Se acomodan los datos para insertarlos en la DB
        user = {
            ...user,
            mail: user.mail.toLocaleLowerCase(), //pongo el mail todo en minuscula
            name: this.fixNameAndLastname(user.name),
            lastname: this.fixNameAndLastname(user.lastname),
        }

        //Se inserta la info en la DB
        try {
            const resultQuery = await this.dbService.executeQuery(
                userQueries.updateUser,
                [
                    user.mail,
                    user.name,
                    user.lastname,
                    user.dni,
                    user.phone,
                    user.id_user
                ],
            );
            if (resultQuery.affectedRows == 1) {
                return 'Se actualizo usuario correctamente';
            }
            throw new HttpException(
                'No se pudo actualizar usuario',
                HttpStatus.NOT_FOUND,
            );
        } catch (error) {
            throw new HttpException(
                `Error actualizando usuario: ${error.sqlMessage}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async deleteUser(id_user:number): Promise<void> {
        try {
            //Se deshabilita el usuario
            const resultQuery = await this.dbService.executeQuery(
                userQueries.deleteUser,
                [id_user],
            );
            if (resultQuery.affectedRows != 1) {
            throw new HttpException(
                'No se pudo deshabilitar usuario',
                HttpStatus.NOT_FOUND,
            );}

            //Luego se borran todos los turnos de hoy en adelante reservados por el usuario
            const resultQuery2 = await this.dbService.executeQuery(
                userQueries.deleteAppointmentsbyuser,
                [id_user],
            );

        } catch (error) {
            throw new HttpException(
                `Error deshabilitando usuario: ${error.sqlMessage}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}