import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { WebSocketEventService } from "./websocket-event.service";

@Injectable()
@WebSocketGateway({
  cors: {
    origin: "*",
  },
  namespace: "/tasks",
})
export class TasksWebSocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(TasksWebSocketGateway.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly webSocketEventService: WebSocketEventService,
  ) {}

  afterInit(server: Server) {
    this.webSocketEventService.setServer(server);
    this.logger.log("WebSocket Gateway initialized");
  }

  async handleConnection(client: Socket) {
    try {
      // Extraer token del handshake
      const token =
        client.handshake.auth?.token ||
        client.handshake.headers?.authorization?.replace("Bearer ", "");

      if (!token) {
        this.logger.warn(`Client ${client.id} disconnected: No token provided`);
        client.disconnect();
        return;
      }

      // Verificar JWT
      const payload = this.jwtService.verify(token);
      const userId = payload.sub;

      // Agregar cliente a la sala del usuario
      await client.join(`user_${userId}`);

      // Guardar información del usuario en el socket
      client.data.userId = userId;
      client.data.email = payload.email;

      this.logger.log(`Client ${client.id} connected for user ${userId}`);

      // Confirmar conexión
      client.emit("connected", {
        message: "Conectado exitosamente",
        userId: userId,
      });
    } catch (error) {
      this.logger.warn(`Client ${client.id} disconnected: Invalid token`);
      client.emit("error", { message: "Token inválido" });
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.data?.userId;
    this.logger.log(
      `Client ${client.id} disconnected${userId ? ` (user ${userId})` : ""}`,
    );
  }
}
