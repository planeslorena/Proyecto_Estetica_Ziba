import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import User from 'src/models/user.dto';
import { UserService } from './user.service';
import { JwtMiddlewareGuard } from 'src/common/services/jwtGuard.service';

@Controller('/user')
export class UserController {
  
  constructor(private userService: UserService) {}
  
  
  @UseGuards(JwtMiddlewareGuard)
  @Get('/clients')
  async getAllClients() {
    return this.userService.getAllClients();
  }

  @UseGuards(JwtMiddlewareGuard)
  @Get('/prof')
  async getAllProf() {
    return this.userService.getAllProf();
  }

  @UseGuards(JwtMiddlewareGuard)
  @Get('/info')
  async getUserInfo(@Req() request:any) {
    return request.user;
  }

  @Post()
  async createUser(@Body() body: User) {
   return this.userService.createUser(body);
  }

  @UseGuards(JwtMiddlewareGuard)
  @Post('/prof')
  async createProf(@Body() body: any) {
   return this.userService.createProf(body);
  }

  @UseGuards(JwtMiddlewareGuard)
  @Put('/client')
  async updateClient(@Body() body: any) {
   return this.userService.updateUser(body);
  }
} 