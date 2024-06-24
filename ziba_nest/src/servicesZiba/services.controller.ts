import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtMiddlewareGuard } from 'src/common/services/jwtGuard.service';
import { ServicesService } from './services.service';

@Controller('/services')
export class ServicesController {
  
  constructor(private servicesService: ServicesService) {}
  
  @Get()
  async getAllServices() {
    return this.servicesService.getAll();
  }

  @UseGuards(JwtMiddlewareGuard)
  @Get('/admin')
  async getAllForAdmin() {
    return this.servicesService.getAllForAdmin();
  }

  @UseGuards(JwtMiddlewareGuard)
  @Get('/appointments')
  async getAllAppointments() {
    return this.servicesService.getAllApponintments();
  }

  @UseGuards(JwtMiddlewareGuard)
  @Get('/specialties')
  async getSpecialtiesWhitoutProf() {
    return this.servicesService.getSpecialtiesWhitoutProf();
  }

  @UseGuards(JwtMiddlewareGuard)
  @Get('/specialtieswhitprof')
  async getAllSpecialtiesWithProf() {
    return this.servicesService.getAllSpecialtiesWithProf();
  }

  @UseGuards(JwtMiddlewareGuard)
  @Post()
  async createProf(@Body() body: any) {
   return this.servicesService.createService(body);
  }

  
} 