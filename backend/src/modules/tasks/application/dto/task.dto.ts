import {
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsBoolean,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { TaskPriority } from "../../domain/entities/task.entity";

export class CreateTaskDto {
  @ApiProperty({
    description: "Título de la tarea",
    example: "Comprar alimentos",
  })
  @IsString({ message: "El título debe ser un texto" })
  title: string;

  @ApiProperty({
    description: "Descripción de la tarea",
    example: "Comprar leche, pan y huevos",
    required: false,
  })
  @IsString({ message: "La descripción debe ser un texto" })
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: "Prioridad de la tarea",
    enum: TaskPriority,
    example: TaskPriority.MEDIUM,
    required: false,
  })
  @IsEnum(TaskPriority, {
    message: "La prioridad debe ser LOW, MEDIUM, HIGH o URGENT",
  })
  @IsOptional()
  priority?: TaskPriority;

  @ApiProperty({
    description: "Fecha de vencimiento de la tarea (opcional)",
    example: "2025-08-30T00:00:00Z",
    required: false,
  })
  @IsDateString(
    {},
    { message: "La fecha de vencimiento debe ser una fecha válida" },
  )
  @IsOptional()
  dueDate?: string;
}

export class UpdateTaskDto {
  @ApiProperty({
    description: "Título de la tarea",
    example: "Comprar alimentos",
    required: false,
  })
  @IsString({ message: "El título debe ser un texto" })
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: "Descripción de la tarea",
    example: "Comprar leche, pan y huevos",
    required: false,
  })
  @IsString({ message: "La descripción debe ser un texto" })
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: "Prioridad de la tarea",
    enum: TaskPriority,
    example: TaskPriority.HIGH,
    required: false,
  })
  @IsEnum(TaskPriority, {
    message: "La prioridad debe ser LOW, MEDIUM, HIGH o URGENT",
  })
  @IsOptional()
  priority?: TaskPriority;

  @ApiProperty({
    description: "Fecha de vencimiento de la tarea",
    example: "2025-08-30T00:00:00Z",
    required: false,
  })
  @IsDateString(
    {},
    { message: "La fecha de vencimiento debe ser una fecha válida" },
  )
  @IsOptional()
  dueDate?: string;

  @ApiProperty({
    description: "Estado de completado de la tarea",
    example: true,
    required: false,
  })
  @IsBoolean({ message: "El estado completado debe ser verdadero o falso" })
  @IsOptional()
  completed?: boolean;
}

export class TaskResponseDto {
  @ApiProperty({ description: "ID único de la tarea", example: 1 })
  id: number;

  @ApiProperty({
    description: "Título de la tarea",
    example: "Comprar alimentos",
  })
  title: string;

  @ApiProperty({
    description: "Descripción de la tarea",
    example: "Comprar leche, pan y huevos",
    nullable: true,
  })
  description: string | null;

  @ApiProperty({ description: "Estado de completado", example: false })
  completed: boolean;

  @ApiProperty({
    description: "Prioridad de la tarea",
    enum: TaskPriority,
    example: TaskPriority.MEDIUM,
  })
  priority: TaskPriority;

  @ApiProperty({
    description: "Fecha de vencimiento",
    example: "2025-08-30T00:00:00.000Z",
    nullable: true,
  })
  dueDate: Date | null;

  @ApiProperty({ description: "ID del usuario propietario", example: 1 })
  userId: number;

  @ApiProperty({
    description: "Información del usuario propietario",
    example: {
      id: 1,
      email: "usuario@ejemplo.com",
      name: "Juan Pérez",
    },
  })
  user: {
    id: number;
    email: string;
    name: string | null;
  };

  @ApiProperty({
    description: "Fecha de creación",
    example: "2025-08-04T20:00:00.000Z",
  })
  createdAt: Date;

  @ApiProperty({
    description: "Fecha de última actualización",
    example: "2025-08-04T20:00:00.000Z",
  })
  updatedAt: Date;
}
