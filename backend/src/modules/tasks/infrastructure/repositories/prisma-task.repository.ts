import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../shared/infrastructure/database/prisma.service";
import { TaskRepository } from "../../domain/repositories/task.repository";
import { Task, TaskPriority } from "../../domain/entities/task.entity";

@Injectable()
export class PrismaTaskRepository implements TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<Task | null> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) return null;

    return new Task(
      task.title,
      task.description,
      task.completed,
      task.priority as TaskPriority,
      task.dueDate,
      task.userId,
      task.id,
      task.createdAt,
      task.updatedAt,
    );
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany();

    return tasks.map(
      (task) =>
        new Task(
          task.title,
          task.description,
          task.completed,
          task.priority as TaskPriority,
          task.dueDate,
          task.userId,
          task.id,
          task.createdAt,
          task.updatedAt,
        ),
    );
  }

  async create(taskData: Task): Promise<Task> {
    const task = await this.prisma.task.create({
      data: {
        title: taskData.title,
        description: taskData.description ?? null,
        completed: taskData.completed,
        priority: taskData.priority,
        dueDate: taskData.dueDate ?? null,
        userId: taskData.userId,
      },
    });

    return new Task(
      task.title,
      task.description,
      task.completed,
      task.priority as TaskPriority,
      task.dueDate,
      task.userId,
      task.id,
      task.createdAt,
      task.updatedAt,
    );
  }

  async update(id: number, taskData: Partial<Task>): Promise<Task> {
    const task = await this.prisma.task.update({
      where: { id },
      data: {
        ...(taskData.title && { title: taskData.title }),
        ...(taskData.description !== undefined && {
          description: taskData.description,
        }),
        ...(taskData.completed !== undefined && {
          completed: taskData.completed,
        }),
        ...(taskData.priority && { priority: taskData.priority }),
        ...(taskData.dueDate !== undefined && { dueDate: taskData.dueDate }),
      },
    });

    return new Task(
      task.title,
      task.description,
      task.completed,
      task.priority as TaskPriority,
      task.dueDate,
      task.userId,
      task.id,
      task.createdAt,
      task.updatedAt,
    );
  }

  async delete(id: number): Promise<void> {
    await this.prisma.task.delete({
      where: { id },
    });
  }

  async findByUserId(userId: number): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      where: { userId },
    });

    return tasks.map(
      (task) =>
        new Task(
          task.title,
          task.description,
          task.completed,
          task.priority as TaskPriority,
          task.dueDate,
          task.userId,
          task.id,
          task.createdAt,
          task.updatedAt,
        ),
    );
  }

  async findByUserIdAndCompleted(
    userId: number,
    completed: boolean,
  ): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      where: { userId, completed },
    });

    return tasks.map(
      (task) =>
        new Task(
          task.title,
          task.description,
          task.completed,
          task.priority as TaskPriority,
          task.dueDate,
          task.userId,
          task.id,
          task.createdAt,
          task.updatedAt,
        ),
    );
  }

  async findByUserIdAndPriority(
    userId: number,
    priority: string,
  ): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      where: { userId, priority: priority as TaskPriority },
    });

    return tasks.map(
      (task) =>
        new Task(
          task.title,
          task.description,
          task.completed,
          task.priority as TaskPriority,
          task.dueDate,
          task.userId,
          task.id,
          task.createdAt,
          task.updatedAt,
        ),
    );
  }

  async findAllWithUsers(): Promise<
    Array<Task & { user: { id: number; email: string; name: string | null } }>
  > {
    const tasksWithUsers = await this.prisma.task.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return tasksWithUsers.map((taskWithUser) => {
      const task = new Task(
        taskWithUser.title,
        taskWithUser.description,
        taskWithUser.completed,
        taskWithUser.priority as TaskPriority,
        taskWithUser.dueDate,
        taskWithUser.userId,
        taskWithUser.id,
        taskWithUser.createdAt,
        taskWithUser.updatedAt,
      );

      // Creamos un objeto que combina la tarea con la información del usuario
      return Object.assign(task, {
        user: taskWithUser.user,
      }) as Task & { user: { id: number; email: string; name: string | null } };
    });
  }
}
