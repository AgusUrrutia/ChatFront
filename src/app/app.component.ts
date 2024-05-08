import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { SocketServiceService } from 'src/socket-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  messages: string[] = [];
  textoIngresado: string = '';

  constructor(private socketService: SocketServiceService) { }

  ngOnInit(): void {
    console.log("Hello!");
        // Escuchar el evento 'message' del servidor
    this.socketService.listen('message').subscribe((message: string) => {
      this.messages.push(message);
      console.log(this.messages);
      
    });
  }

  submitForm() {
    
    // Aquí puedes realizar cualquier acción con el texto ingresado
  }

  sendMessage(): void {
    if (this.textoIngresado.trim() !== '') {
      // Emitir un mensaje al servidor
      this.socketService.emit('message', this.textoIngresado);
      this.textoIngresado = ''; // Limpiar el campo de mensaje después de enviar
    }
  }

  escojerNombre(nombre : String): void {
    this.socketService.emit('setUsername', nombre);
  }
}
