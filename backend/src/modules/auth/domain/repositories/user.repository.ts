import { BaseRepository } from "../../../../shared/application/interfaces/repository.interface";
import { User } from "../entities/user.entity";

export interface UserRepository extends BaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}
