import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
  ParseIntPipe,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../../../auth/infrastructure/guards/jwt-auth.guard";
import { TaskOwnerGuard } from "../guards/task-owner.guard";
import { CreateTaskUseCase } from "../../application/use-cases/create-task.use-case";
import { GetTasksUseCase } from "../../application/use-cases/get-tasks.use-case";
import { GetUserTasksUseCase } from "../../application/use-cases/get-user-tasks.use-case";
import { UpdateTaskUseCase } from "../../application/use-cases/update-task.use-case";
import { DeleteTaskUseCase } from "../../application/use-cases/delete-task.use-case";
import {
  CreateTaskDto,
  UpdateTaskDto,
  TaskResponseDto,
} from "../../application/dto/task.dto";

@ApiTags("Tareas")
@ApiBearerAuth()
@Controller("tasks")
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly getTasksUseCase: GetTasksUseCase,
    private readonly getUserTasksUseCase: GetUserTasksUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
  ) {}

  @ApiOperation({ summary: "Crear nueva tarea" })
  @ApiResponse({
    status: 201,
    description: "Tarea creada exitosamente",
    type: TaskResponseDto,
  })
  @ApiResponse({ status: 401, description: "No autorizado" })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createTask(
    @Request() req,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.createTaskUseCase.execute(createTaskDto, req.user.userId);
  }

  @ApiOperation({ summary: "Obtener todas las tareas de todos los usuarios" })
  @ApiResponse({
    status: 200,
    description: "Lista de todas las tareas con información del usuario",
    type: [TaskResponseDto],
  })
  @ApiResponse({ status: 401, description: "No autorizado" })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTasks(): Promise<TaskResponseDto[]> {
    return this.getTasksUseCase.execute();
  }

  @ApiOperation({ summary: "Obtener las tareas del usuario autenticado" })
  @ApiResponse({
    status: 200,
    description: "Lista de tareas del usuario",
    type: [TaskResponseDto],
  })
  @ApiResponse({ status: 401, description: "No autorizado" })
  @UseGuards(JwtAuthGuard)
  @Get("my-tasks")
  async getMyTasks(@Request() req): Promise<TaskResponseDto[]> {
    return this.getUserTasksUseCase.execute(req.user.userId);
  }

  @ApiOperation({ summary: "Actualizar una tarea (solo el propietario)" })
  @ApiParam({ name: "id", description: "ID de la tarea", type: "number" })
  @ApiResponse({
    status: 200,
    description: "Tarea actualizada exitosamente",
    type: TaskResponseDto,
  })
  @ApiResponse({ status: 401, description: "No autorizado" })
  @ApiResponse({ status: 403, description: "Sin permisos para esta tarea" })
  @ApiResponse({ status: 404, description: "Tarea no encontrada" })
  @UseGuards(JwtAuthGuard, TaskOwnerGuard)
  @Put(":id")
  async updateTask(
    @Param("id", ParseIntPipe) id: number,
    @Request() req,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.updateTaskUseCase.execute(id, updateTaskDto, req.user.userId);
  }

  @ApiOperation({ summary: "Eliminar una tarea (solo el propietario)" })
  @ApiParam({ name: "id", description: "ID de la tarea", type: "number" })
  @ApiResponse({ status: 200, description: "Tarea eliminada exitosamente" })
  @ApiResponse({ status: 401, description: "No autorizado" })
  @ApiResponse({ status: 403, description: "Sin permisos para esta tarea" })
  @ApiResponse({ status: 404, description: "Tarea no encontrada" })
  @UseGuards(JwtAuthGuard, TaskOwnerGuard)
  @Delete(":id")
  async deleteTask(
    @Param("id", ParseIntPipe) id: number,
    @Request() req,
  ): Promise<void> {
    await this.deleteTaskUseCase.execute(id, req.user.userId);
  }
}
