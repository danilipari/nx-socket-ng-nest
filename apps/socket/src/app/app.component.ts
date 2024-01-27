import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { WebSocketService } from './services/web-socket.service';
import { Subscription } from 'rxjs';
import { NbToastrService } from '@nebular/theme';

@Component({
  standalone: false,
  selector: 'socket-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'socket';
  private messageSubscription: Subscription;

  constructor(
    private webSocketService: WebSocketService,
    private toastrService: NbToastrService
  ) {
    this.messageSubscription = this.webSocketService.onMessage('receive_message').subscribe((message: unknown) => {
      this.toastrService.show('Messaggio ricevuto', `${message}`, { duration: 3_000 });
    });
  }

  sendMessage() {
    const message = "Hello from Angular@17";
    this.webSocketService.sendMessage('send_message', message);
    this.toastrService.show('Messaggio inviato', `${message}`, { status: 'control', duration: 2_000 });
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
    this.webSocketService.disconnect();
  }
}
