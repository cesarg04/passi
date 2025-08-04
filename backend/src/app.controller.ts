import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserSchema, UpdateUserSchema, UserResponseSchema } from './schemas/user.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  async getUsers() {
    return this.appService.getUsers();
  }

  @Get('users/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.appService.getUserById(id);
  }

  @Post('users')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUser(@Body() userData: CreateUserSchema): Promise<UserResponseSchema> {
    return this.appService.createUser(userData.email, userData.name);
  }

  @Put('users/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: UpdateUserSchema
  ): Promise<UserResponseSchema> {
    return this.appService.updateUser(id, userData.email, userData.name);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.appService.deleteUser(id);
  }
}
