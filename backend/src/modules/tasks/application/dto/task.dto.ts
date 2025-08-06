import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Título de la tarea',
    example: 'Comprar alimentos',
  })
  @IsString({ message: 'El título debe ser un texto' })
  title: string;

  @ApiProperty({
    description: 'Descripción de la tarea',
    example: 'Comprar leche, pan y huevos',
    required: false,
  })
  @IsString({ message: 'La descripción debe ser un texto' })
  @IsOptional()
  description?: string;
}

export class UpdateTaskDto {
  @ApiProperty({
    description: 'Título de la tarea',
    example: 'Comprar alimentos',
    required: false,
  })
  @IsString({ message: 'El título debe ser un texto' })
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'Descripción de la tarea',
    example: 'Comprar leche, pan y huevos',
    required: false,
  })
  @IsString({ message: 'La descripción debe ser un texto' })
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Estado de completado de la tarea',
    example: true,
    required: false,
  })
  @IsBoolean({ message: 'El estado completado debe ser verdadero o falso' })
  @IsOptional()
  completed?: boolean;
}

export class TaskResponseDto {
  @ApiProperty({ description: 'ID único de la tarea', example: 1 })
  id: number;

  @ApiProperty({
    description: 'Título de la tarea',
    example: 'Comprar alimentos',
  })
  title: string;

  @ApiProperty({
    description: 'Descripción de la tarea',
    example: 'Comprar leche, pan y huevos',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({ description: 'Estado de completado', example: false })
  completed: boolean;

  @ApiProperty({ description: 'ID del usuario propietario', example: 1 })
  userId: number;

  @ApiProperty({
    description: 'Información del usuario propietario',
    example: {
      id: 1,
      email: 'usuario@ejemplo.com',
      name: 'Juan Pérez',
    },
  })
  user: {
    id: number;
    email: string;
    name: string | null;
  };

  @ApiProperty({
    description: 'Fecha de creación',
    example: '2025-08-04T20:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de última actualización',
    example: '2025-08-04T20:00:00.000Z',
  })
  updatedAt: Date;
}
