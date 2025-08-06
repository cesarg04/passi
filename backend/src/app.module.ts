import { Module } from "@nestjs/common";
import { SharedModule } from "./shared/shared.module";
import { AuthModule } from "./modules/auth/auth.module";
import { TaskModule } from "./modules/tasks/task.module";

@Module({
  imports: [SharedModule, AuthModule, TaskModule],
})
export class AppModule {}
