import { IsEmail, IsString, MinLength, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { EmailTransform } from "../../../../shared/infrastructure/decorators/email-transform.decorator";

export class LoginDto {
  @ApiProperty({
    description: "Email del usuario",
    example: "usuario@ejemplo.com",
  })
  @IsEmail({}, { message: "El email debe tener un formato válido" })
  @EmailTransform()
  email: string;

  @ApiProperty({
    description: "Contraseña del usuario",
    example: "miPassword123",
    minLength: 6,
  })
  @IsString({ message: "La contraseña debe ser un texto" })
  @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  password: string;
}

export class RegisterDto {
  @ApiProperty({
    description: "Email del usuario",
    example: "usuario@ejemplo.com",
  })
  @IsEmail({}, { message: "El email debe tener un formato válido" })
  @EmailTransform()
  email: string;

  @ApiProperty({
    description: "Contraseña del usuario",
    example: "miPassword123",
    minLength: 6,
  })
  @IsString({ message: "La contraseña debe ser un texto" })
  @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  password: string;

  @ApiProperty({
    description: "Nombre del usuario (opcional)",
    example: "Juan Pérez",
    required: false,
  })
  @IsString({ message: "El nombre debe ser un texto" })
  @IsOptional()
  name?: string;
}

export class AuthResponseDto {
  @ApiProperty({
    description: "Token JWT para autenticación",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  })
  access_token: string;

  @ApiProperty({
    description: "Información del usuario",
    example: {
      id: 1,
      email: "usuario@ejemplo.com",
      name: "Juan Pérez",
    },
  })
  user: {
    id: number;
    email: string;
    name?: string;
  };
}
