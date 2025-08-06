import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../shared/infrastructure/database/prisma.service";
import { UserRepository } from "../../domain/repositories/user.repository";
import { User } from "../../domain/entities/user.entity";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    return new User(
      user.email,
      user.password,
      user.name || undefined,
      user.id,
      user.createdAt,
      user.updatedAt,
    );
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    return users.map(
      (user) =>
        new User(
          user.email,
          user.password,
          user.name || undefined,
          user.id,
          user.createdAt,
          user.updatedAt,
        ),
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return new User(
      user.email,
      user.password,
      user.name || undefined,
      user.id,
      user.createdAt,
      user.updatedAt,
    );
  }

  async create(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        name: user.name,
      },
    });

    return new User(
      createdUser.email,
      createdUser.password,
      createdUser.name || undefined,
      createdUser.id,
      createdUser.createdAt,
      createdUser.updatedAt,
    );
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        ...(userData.email && { email: userData.email }),
        ...(userData.password && { password: userData.password }),
        ...(userData.name && { name: userData.name }),
      },
    });

    return new User(
      updatedUser.email,
      updatedUser.password,
      updatedUser.name || undefined,
      updatedUser.id,
      updatedUser.createdAt,
      updatedUser.updatedAt,
    );
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
