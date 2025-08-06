import {
  Injectable,
  Inject,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import type { TaskRepository } from "../../domain/repositories/task.repository";
import { TASK_REPOSITORY_TOKEN } from "../../domain/tokens";
import { WebSocketEventService } from "../../../../shared/infrastructure/websocket/websocket-event.service";

@Injectable()
export class DeleteTaskUseCase {
  constructor(
    @Inject(TASK_REPOSITORY_TOKEN)
    private readonly taskRepository: TaskRepository,
    private readonly webSocketEventService: WebSocketEventService,
  ) {}

  async execute(taskId: number, userId: number): Promise<void> {
    const existingTask = await this.taskRepository.findById(taskId);

    if (!existingTask) {
      throw new NotFoundException("Tarea no encontrada");
    }

    if (existingTask.userId !== userId) {
      throw new ForbiddenException(
        "No tienes permisos para eliminar esta tarea",
      );
    }

    await this.taskRepository.delete(taskId);

    // Emitir evento WebSocket
    this.webSocketEventService.taskDeleted(userId, taskId);
  }
}
