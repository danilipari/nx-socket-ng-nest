import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: Socket;
  private url = 'http://localhost:3000';

  constructor() {
    this.socket = io(this.url, {
      withCredentials: true,
      extraHeaders: {}
    });

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server!');
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });
  }

  // Invia un messaggio al server
  sendMessage(event: string, data: unknown) {
    this.socket.emit(event, data);
  }

  // Ascolta i messaggi in arrivo dal server
  onMessage(event: string): Observable<unknown> {
    return new Observable((observer) => {
      this.socket.on(event, (data) => {
        observer.next(data);
      });
    });
  }

  // Gestisci la disconnessione
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

}
