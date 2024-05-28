import { AxiosError, AxiosResponse } from 'axios';
import clientAxios, { setAuthToken } from './Axios';

export const login = async (usuario:any) => {
  try {
    const respuesta: AxiosResponse<any, any> = await clientAxios.post('auth/login',usuario);
    const token = respuesta.data.accessToken;
    sessionStorage.setItem("accessToken", token);
    setAuthToken(token);
    return respuesta.data;
  } catch (error:any) {
    return error.response.data.statusCode;
  }
}