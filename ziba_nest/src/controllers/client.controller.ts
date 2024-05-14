import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import Client from 'src/models/client.dto';
import { ClientService } from 'src/services/client.service';

@Controller('/api')
export class ClientController {

  constructor(private clientService: ClientService) {}

  @Post('/client')
  async createClient(@Body() body: Client) {
   return this.clientService.createClient(body);
  }


}