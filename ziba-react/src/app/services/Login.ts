import { AxiosError, AxiosResponse } from 'axios';
import clienteAxios from './Axios';

export const login = async (usuario:any) => {
  try {
    const respuesta: AxiosResponse<any, any> = await clienteAxios.post('auth/login',usuario);
    sessionStorage.setItem('token',respuesta.data.accessToken);
    console.log(respuesta)
    return respuesta.data;
  } catch (error:any) {
    return error.response.data.message;
    console.log(error);
    throw new Error('Error en el login');
  }
}