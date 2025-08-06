import { Injectable, Inject } from '@nestjs/common';
import type { TaskRepository } from '../../domain/repositories/task.repository';
import { TASK_REPOSITORY_TOKEN } from '../../domain/tokens';
import { Task } from '../../domain/entities/task.entity';
import { CreateTaskDto, TaskResponseDto } from '../dto/task.dto';
import { WebSocketEventService } from '../../../../shared/infrastructure/websocket/websocket-event.service';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject(TASK_REPOSITORY_TOKEN)
    private readonly taskRepository: TaskRepository,
    private readonly webSocketEventService: WebSocketEventService,
  ) {}

  async execute(
    createTaskDto: CreateTaskDto,
    userId: number,
  ): Promise<TaskResponseDto> {
    const task = Task.create(
      createTaskDto.title,
      userId,
      createTaskDto.description,
    );

    const createdTask = await this.taskRepository.create(task);
    const taskResponse = createdTask.toJSON() as TaskResponseDto;

    // Emitir evento WebSocket
    this.webSocketEventService.taskCreated(userId, taskResponse);

    return taskResponse;
  }
}
