import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import User from 'src/models/user.dto';
import { UserService } from 'src/services/user.service';

@Controller('/api')
export class UserController {

  constructor(private clientService: UserService) {}

  @Post('/user')
  async createUser(@Body() body: User) {
   return this.clientService.createUser(body);
  }


} 