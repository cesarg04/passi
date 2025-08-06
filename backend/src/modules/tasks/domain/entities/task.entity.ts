import { BaseEntity } from "../../../../shared/domain/entities/base.entity";

export class Task extends BaseEntity {
  constructor(
    public readonly title: string,
    public readonly description: string | null,
    public readonly completed: boolean,
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
  ): Task {
    return new Task(
      title,
      description || null,
      false,
      userId,
    );
  }

  toJSON(): Record<string, any> {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      completed: this.completed,
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
      this.userId,
      this.id,
      this.createdAt,
      this.updatedAt,
    );
  }

  updateDetails(
    title?: string,
    description?: string,
  ): Task {
    return new Task(
      title ?? this.title,
      description !== undefined ? description : this.description,
      this.completed,
      this.userId,
      this.id,
      this.createdAt,
      this.updatedAt,
    );
  }
}
