import { Server } from 'socket.io';
import { snackOrderConfig } from '@controllers';

export function setupSocket(socket: Server) {
  snackOrderConfig(socket);
}
