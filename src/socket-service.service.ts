import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {
  private socket: any;
  // private readonly url = 'http://localhost:3000'; // Change this to your server URL
  private readonly url = 'https://chat-x4ou.onrender.com/'; // Change this to your server URL
  

  constructor() {
    this.socket = io.connect(this.url);
  }

  // Example method to listen for a specific event
  listen(eventName: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
        console.log(data);
        
      });
    });
  }

  // Example method to emit an event
  emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }
}