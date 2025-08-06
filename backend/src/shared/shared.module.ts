import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "./infrastructure/database/prisma.service";
import { WebSocketEventService } from "./infrastructure/websocket/websocket-event.service";
import { TasksWebSocketGateway } from "./infrastructure/websocket/websocket.gateway";
import { EmailTransformPipe } from "./infrastructure/pipes/email-transform.pipe";

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || "your-secret-key",
      signOptions: { expiresIn: "24h" },
    }),
  ],
  providers: [
    PrismaService,
    WebSocketEventService,
    TasksWebSocketGateway,
    EmailTransformPipe,
  ],
  exports: [PrismaService, WebSocketEventService, EmailTransformPipe],
})
export class SharedModule {}
