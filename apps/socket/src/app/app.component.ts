import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { WebSocketService } from './services/web-socket.service';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'socket-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], // Correggi 'styleUrl' in 'styleUrls'
})
export class AppComponent implements OnDestroy {
  title = 'socket';
  private messageSubscription: Subscription;

  constructor(private webSocketService: WebSocketService) {
    // Ascolta i messaggi in arrivo dal server
    this.messageSubscription = this.webSocketService.onMessage('receive_message').subscribe((message: unknown) => {
      console.log('Messaggio ricevuto:', message);
    });
  }

  sendMessage() {
    const message = "Hello from Angular";
    this.webSocketService.sendMessage('send_message', message);
  }

  ngOnDestroy() {
    // Annulla l'iscrizione e disconnetti quando il componente viene distrutto
    this.messageSubscription.unsubscribe();
    this.webSocketService.disconnect();
  }
}
