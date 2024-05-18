import { IsInt, IsOptional, IsString } from 'class-validator';

class Client {
  @IsInt()
  @IsOptional()
  id_client?: number;

  @IsString()
  mail: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsInt()
  dni: number;

  @IsInt()
  phone: number;
}

export default Client;