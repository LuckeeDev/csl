// Main imports
import { environment as env } from '@environments/environment';
import * as http from 'http';
import * as io from 'socket.io';
import { app } from '@core';
import { setupSocket } from './app/core/socket';

// Start server and socket
const port = env.PORT;
const server = http.createServer(app);
const socket = io(server, { path: '/socket' });

setupSocket(socket);

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

console.log('test');
