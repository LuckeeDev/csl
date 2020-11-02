import { Server } from 'socket.io';
import { snackOrderConfig } from '../models/snack-order';

export const config = (socket: Server) => {
  snackOrderConfig(socket);
};
