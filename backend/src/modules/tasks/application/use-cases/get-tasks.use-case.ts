import { Injectable, Inject } from "@nestjs/common";
import type { TaskRepository } from "../../domain/repositories/task.repository";
import { TASK_REPOSITORY_TOKEN } from "../../domain/tokens";
import { TaskResponseDto } from "../dto/task.dto";

@Injectable()
export class GetTasksUseCase {
  constructor(
    @Inject(TASK_REPOSITORY_TOKEN)
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(): Promise<TaskResponseDto[]> {
    const tasksWithUsers = await this.taskRepository.findAllWithUsers();
    return tasksWithUsers.map((taskWithUser) => ({
      ...taskWithUser.toJSON(),
      user: taskWithUser.user,
    })) as TaskResponseDto[];
  }
}
