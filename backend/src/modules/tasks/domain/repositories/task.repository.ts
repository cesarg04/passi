import { BaseRepository } from "../../../../shared/application/interfaces/repository.interface";
import { Task } from "../entities/task.entity";

export interface TaskRepository extends BaseRepository<Task> {
  findByUserId(userId: number): Promise<Task[]>;
  findByUserIdAndCompleted(userId: number, completed: boolean): Promise<Task[]>;
  findByUserIdAndPriority(userId: number, priority: string): Promise<Task[]>;
  findAllWithUsers(): Promise<
    Array<Task & { user: { id: number; email: string; name: string | null } }>
  >;
}
