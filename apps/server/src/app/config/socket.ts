import { Server } from 'socket.io';
import { snackOrderConfig } from '@controllers/snack-order';

export const socketConfig = (socket: Server) => {
  snackOrderConfig(socket);
};
