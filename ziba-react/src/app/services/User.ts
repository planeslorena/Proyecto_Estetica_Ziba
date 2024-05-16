import { AxiosResponse } from 'axios';
import clienteAxios from './Axios';

export const createUser = async (usuario:any) => {
  try {
    const respuesta: AxiosResponse<any, any> = await clienteAxios.post('api/user',usuario);
    return respuesta.data;
  } catch (err) {
    throw new Error('Error en la registración');
  }
}