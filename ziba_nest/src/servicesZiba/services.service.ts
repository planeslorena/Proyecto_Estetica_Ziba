import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from '../common/services/db.service';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import servicesQueries from './services.queries';
import Services from 'src/models/services.dto';


@Injectable()
export class ServicesService {
    constructor(private dbService: DatabaseService) {
    }

    //Funcion que obtiene todos los servicios brindados por la estetica
    async getAll(): Promise<Services[]> {

        //Primero se obtienen las especialidades
        const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(
            servicesQueries.selectAllSpecialties,
            [],
        );

        let resultServices: Services[] = resultQuery.map((rs: RowDataPacket) => {
            return {
                speciality: rs['speciality'],
                professional: `${rs['name']} ${rs['lastname']}`,
                services: []
            };
        });

        //luego obtengo los servicios para cada especilidad
        const resultQuery2: RowDataPacket[] = await this.dbService.executeSelect(
            servicesQueries.selectAllServices,
            [],
        );

        resultQuery2.map((rs: RowDataPacket) => {
             resultServices.map((se) => {
                if (rs['speciality'] == se.speciality) {
                    se.services.push(rs['service'])
                }
                return resultServices
            })
        });

        return resultServices;
    }

        //Funcion que obtiene todos los servicios brindados por la estetica con especialidad, profesional y horarios
        async getAllForAdmin(): Promise<any[]> {

            //Primero se obtengo los servicio con especialidad y profesional
            const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(
                servicesQueries.selectServiceWithSpeciality,
                [],
            );
    
            let resultServices: any[] = resultQuery.map((rs: RowDataPacket) => {
                return {
                    id: rs['id_service'],
                    service: rs['service'],
                    description: rs['description'],
                    speciality: rs['speciality'],
                    professional: `${rs['name']} ${rs['lastname']}`,
                    price: rs['price'],
                };
            });
        
            return resultServices;
        }
    

        async getAllApponintments(): Promise<any[]> {

            //Primero se obtengo los servicio con especialidad y profesional
            const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(
                servicesQueries.selectAllAppointments,
                [],
            );
    
            let resultApponitments: any[] = resultQuery.map((rs: RowDataPacket) => {
                return {
                    id: rs['id_appointment'],
                    date: rs['date'],
                    hour: rs['hour'],
                    service: rs['service'],
                    user: `${rs['name']} ${rs['lastname']}`,
                };
            });
            return resultApponitments;
        }

        async getAllSpecialties(): Promise<any[]> {

            //Primero se obtengo los servicio con especialidad y profesional
            const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(
                servicesQueries.selectAllSpecialties,
                [],
            );
    
            let resultSpecialties: any[] = resultQuery.map((rs: RowDataPacket) => {
                return {
                    id: rs['id_speciality'],
                    speciality: rs['name']
                };
            });
            return resultSpecialties;
        }
}