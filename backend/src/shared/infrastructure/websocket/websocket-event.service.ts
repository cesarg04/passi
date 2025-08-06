import { Injectable } from "@nestjs/common";
import { Server } from "socket.io";

@Injectable()
export class WebSocketEventService {
  private server: Server;

  setServer(server: Server) {
    this.server = server;
  }

  // Emitir evento a un usuario específico
  emitToUser(userId: number, event: string, data: any) {
    if (this.server) {
      this.server.to(`user_${userId}`).emit(event, data);
    }
  }

  // Emitir evento a todos los usuarios conectados
  emitToAll(event: string, data: any) {
    if (this.server) {
      this.server.emit(event, data);
    }
  }

  // Eventos específicos para tareas
  taskCreated(userId: number, task: any) {
    this.emitToUser(userId, "task:created", task);
  }

  taskUpdated(userId: number, task: any) {
    this.emitToUser(userId, "task:updated", task);
  }

  taskDeleted(userId: number, taskId: number) {
    this.emitToUser(userId, "task:deleted", { id: taskId });
  }
}
