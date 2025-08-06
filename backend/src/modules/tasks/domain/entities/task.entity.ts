import { BaseEntity } from "../../../../shared/domain/entities/base.entity";

export enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export class Task extends BaseEntity {
  constructor(
    public readonly title: string,
    public readonly description: string | null,
    public readonly completed: boolean,
    public readonly priority: TaskPriority,
    public readonly dueDate: Date | null,
    public readonly userId: number,
    id?: number,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    super(id, createdAt, updatedAt);
  }

  static create(
    title: string,
    userId: number,
    description?: string,
    priority: TaskPriority = TaskPriority.MEDIUM,
    dueDate?: Date,
  ): Task {
    return new Task(
      title,
      description || null,
      false,
      priority,
      dueDate || null,
      userId,
    );
  }

  toJSON(): Record<string, any> {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      completed: this.completed,
      priority: this.priority,
      dueDate: this.dueDate,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  markAsCompleted(): Task {
    return new Task(
      this.title,
      this.description,
      true,
      this.priority,
      this.dueDate,
      this.userId,
      this.id,
      this.createdAt,
      this.updatedAt,
    );
  }

  markAsIncomplete(): Task {
    return new Task(
      this.title,
      this.description,
      false,
      this.priority,
      this.dueDate,
      this.userId,
      this.id,
      this.createdAt,
      this.updatedAt,
    );
  }

  updateDetails(
    title?: string,
    description?: string,
    priority?: TaskPriority,
    dueDate?: Date,
  ): Task {
    return new Task(
      title ?? this.title,
      description !== undefined ? description : this.description,
      this.completed,
      priority ?? this.priority,
      dueDate !== undefined ? dueDate : this.dueDate,
      this.userId,
      this.id,
      this.createdAt,
      this.updatedAt,
    );
  }
}
