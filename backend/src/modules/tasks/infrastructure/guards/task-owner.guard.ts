import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
  Inject,
} from "@nestjs/common";
import type { TaskRepository } from "../../domain/repositories/task.repository";
import { TASK_REPOSITORY_TOKEN } from "../../domain/tokens";

@Injectable()
export class TaskOwnerGuard implements CanActivate {
  constructor(
    @Inject(TASK_REPOSITORY_TOKEN)
    private readonly taskRepository: TaskRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.userId;
    const taskId = parseInt(request.params.id);

    if (!userId) {
      throw new ForbiddenException("Usuario no autenticado");
    }

    if (!taskId || isNaN(taskId)) {
      throw new ForbiddenException("ID de tarea inválido");
    }

    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new NotFoundException("Tarea no encontrada");
    }

    if (task.userId !== userId) {
      throw new ForbiddenException(
        "No tienes permisos para modificar esta tarea",
      );
    }

    return true;
  }
}
