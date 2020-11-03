import { Server } from 'socket.io';
import { snackOrderConfig } from '@controllers/snack-order';

export const config = (socket: Server) => {
  snackOrderConfig(socket);
};
