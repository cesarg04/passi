import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { EmailTransform } from "../decorators/email-transform.decorator";

/**
 * Ejemplo de DTO que usa EmailTransform
 *
 * El decorator @EmailTransform() convertirá automáticamente cualquier email
 * a minúsculas y eliminará espacios en blanco al inicio y final
 */
export class ExampleUserDto {
  @ApiProperty({
    description: "Email del usuario",
    example: "Usuario@Ejemplo.COM",
  })
  @IsEmail({}, { message: "El email debe tener un formato válido" })
  @EmailTransform() // Este decorator convierte "Usuario@Ejemplo.COM " a "usuario@ejemplo.com"
  email: string;

  @ApiProperty({
    description: "Nombre del usuario",
    example: "Juan Pérez",
  })
  @IsString({ message: "El nombre debe ser un texto" })
  name: string;
}

/**
 * Ejemplo de uso en controlador:
 *
 * @Controller('users')
 * export class UserController {
 *   @Post()
 *   async createUser(@Body() userData: ExampleUserDto) {
 *     // El email ya llegará transformado a minúsculas
 *     console.log(userData.email); // "usuario@ejemplo.com"
 *     return userData;
 *   }
 * }
 *
 * También podrías aplicar el EmailTransformPipe a un endpoint específico:
 *
 * @Post()
 * @UsePipes(new EmailTransformPipe())
 * async createUser(@Body() userData: any) {
 *   // El pipe transformará todos los campos que contengan "email"
 *   return userData;
 * }
 */
