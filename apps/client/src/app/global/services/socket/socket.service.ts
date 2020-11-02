import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

type ListenEvent = 'Orders';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: typeof Socket;

  constructor() {
    this.socket = io({ path: '/api/socket' });
  }

  listen(event: ListenEvent) {
    return new Observable((subscriber) => {
      this.socket.on(event, (data) => {
        subscriber.next(data);
      });
    });
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }
}
