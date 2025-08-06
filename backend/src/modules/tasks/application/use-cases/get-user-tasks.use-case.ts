import { Injectable, Inject } from "@nestjs/common";
import type { TaskRepository } from "../../domain/repositories/task.repository";
import { TASK_REPOSITORY_TOKEN } from "../../domain/tokens";
import { TaskResponseDto } from "../dto/task.dto";

@Injectable()
export class GetUserTasksUseCase {
  constructor(
    @Inject(TASK_REPOSITORY_TOKEN)
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(userId: number): Promise<TaskResponseDto[]> {
    const tasks = await this.taskRepository.findByUserId(userId);
    return tasks.map((task) => task.toJSON() as TaskResponseDto);
  }
}
