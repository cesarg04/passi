import { IsEmail, IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateUserSchema {
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @IsString({ message: 'El nombre debe ser un texto' })
  @IsOptional()
  name?: string;
}

export class UpdateUserSchema {
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @IsOptional()
  email?: string;

  @IsString({ message: 'El nombre debe ser un texto' })
  @IsOptional()
  name?: string;
}

export class UserResponseSchema {
  id: number;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
}
