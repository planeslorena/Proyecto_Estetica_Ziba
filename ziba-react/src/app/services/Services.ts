'use client'
import { AxiosResponse } from 'axios';
import clientAxios from './Axios';

export const getInfoServices = async (): Promise<any> => {
  const response: AxiosResponse<any, any> = await clientAxios.get('services');
  return response.data;
}

export const getServicesForAdmin = async (): Promise<any> => {
  const response: AxiosResponse<any, any> = await clientAxios.get('services/admin');
  return response.data;
}

export const getAllAppointments = async (): Promise<any> => {
  const response: AxiosResponse<any, any> = await clientAxios.get('services/appointments');
  return response.data;
}

export const getSpecialtiesWhitoutProf = async (): Promise<any> => {
  const response: AxiosResponse<any, any> = await clientAxios.get('services/specialties');
  return response.data;
}

export const getSpecialtiesWhitProf = async (): Promise<any> => {
  const response: AxiosResponse<any, any> = await clientAxios.get('services/specialtieswhitprof');
  return response.data;
}

export const createService = async (data:any) => {
  try {
    const response: AxiosResponse<any, any> = await clientAxios.post('services',data);
    return response.status;
  } catch (error:any) {
    return error.response.data.statusCode;
  }
}