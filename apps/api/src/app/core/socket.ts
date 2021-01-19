import { Server } from 'socket.io';
import { snackOrderConfig } from '@controllers/snack-order';

export function setupSocket(socket: Server) {
  snackOrderConfig(socket);
}
