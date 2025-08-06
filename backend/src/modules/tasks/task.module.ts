import { Module } from "@nestjs/common";

// Application Layer
import { CreateTaskUseCase } from "./application/use-cases/create-task.use-case";
import { GetTasksUseCase } from "./application/use-cases/get-tasks.use-case";
import { GetUserTasksUseCase } from "./application/use-cases/get-user-tasks.use-case";
import { UpdateTaskUseCase } from "./application/use-cases/update-task.use-case";
import { DeleteTaskUseCase } from "./application/use-cases/delete-task.use-case";

// Infrastructure Layer
import { TaskController } from "./infrastructure/controllers/task.controller";
import { TaskOwnerGuard } from "./infrastructure/guards/task-owner.guard";
import { PrismaTaskRepository } from "./infrastructure/repositories/prisma-task.repository";

// Domain Tokens
import { TASK_REPOSITORY_TOKEN } from "./domain/tokens";

@Module({
  controllers: [TaskController],
  providers: [
    // Use Cases
    CreateTaskUseCase,
    GetTasksUseCase,
    GetUserTasksUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,

    // Guards
    TaskOwnerGuard,

    // Repository Implementations
    {
      provide: TASK_REPOSITORY_TOKEN,
      useClass: PrismaTaskRepository,
    },
  ],
  exports: [TASK_REPOSITORY_TOKEN],
})
export class TaskModule {}
