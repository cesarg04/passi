import {
  Injectable,
  Inject,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import type { TaskRepository } from "../../domain/repositories/task.repository";
import { TASK_REPOSITORY_TOKEN } from "../../domain/tokens";
import { UpdateTaskDto, TaskResponseDto } from "../dto/task.dto";
import { WebSocketEventService } from "../../../../shared/infrastructure/websocket/websocket-event.service";

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    @Inject(TASK_REPOSITORY_TOKEN)
    private readonly taskRepository: TaskRepository,
    private readonly webSocketEventService: WebSocketEventService,
  ) {}

  async execute(
    taskId: number,
    updateTaskDto: UpdateTaskDto,
    userId: number,
  ): Promise<TaskResponseDto> {
    const existingTask = await this.taskRepository.findById(taskId);

    if (!existingTask) {
      throw new NotFoundException("Tarea no encontrada");
    }

    if (existingTask.userId !== userId) {
      throw new ForbiddenException(
        "No tienes permisos para actualizar esta tarea",
      );
    }

    let updatedTask = existingTask;

    // Actualizar detalles básicos si se proporcionan
    if (
      updateTaskDto.title ||
      updateTaskDto.description !== undefined ||
      updateTaskDto.priority ||
      updateTaskDto.dueDate !== undefined
    ) {
      updatedTask = updatedTask.updateDetails(
        updateTaskDto.title,
        updateTaskDto.description,
        updateTaskDto.priority,
        updateTaskDto.dueDate ? new Date(updateTaskDto.dueDate) : undefined,
      );
    }

    // Manejar el estado de completado
    if (updateTaskDto.completed !== undefined) {
      updatedTask = updateTaskDto.completed
        ? updatedTask.markAsCompleted()
        : updatedTask.markAsIncomplete();
    }

    const savedTask = await this.taskRepository.update(taskId, updatedTask);
    const taskResponse = savedTask.toJSON() as TaskResponseDto;

    // Emitir evento WebSocket
    this.webSocketEventService.taskUpdated(userId, taskResponse);

    return taskResponse;
  }
}
