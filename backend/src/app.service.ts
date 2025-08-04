import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createUser(email: string, name?: string) {
    return this.prisma.user.create({
      data: {
        email,
        name,
      },
    });
  }

  async getUsers() {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updateUser(id: number, email?: string, name?: string) {
    return this.prisma.user.update({
      where: { id },
      data: {
        ...(email && { email }),
        ...(name && { name }),
      },
    });
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
