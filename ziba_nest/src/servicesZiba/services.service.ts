import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from '../common/services/db.service';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import servicesQueries from './services.queries';
import Services from 'src/models/services.dto';


@Injectable()
export class ServicesService {
    constructor(private dbService: DatabaseService) {
    }


    
    async getAll(): Promise<Services[]> {
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
    
}