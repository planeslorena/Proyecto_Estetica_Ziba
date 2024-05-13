import { IsInt, IsOptional, IsString } from 'class-validator';

class User {
  @IsInt()
  @IsOptional()
  id_user?: number;

  @IsString()
  username: string;

  @IsString()
  role: string;

  @IsString()
  name: string;
}

export default User;