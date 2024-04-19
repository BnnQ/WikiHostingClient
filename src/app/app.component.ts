import {Component, Inject, OnInit} from '@angular/core';
import {SERVICE_IDENTIFIERS} from "./app.module";
import {INotificationService} from "../services/abstractions/i-notification-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'WikiHostingClient';
  signalConnectionId : string = '';

  constructor(@Inject(SERVICE_IDENTIFIERS.INotificationService) private readonly notificationService: INotificationService) {
  }

  async ngOnInit(): Promise<void> {
        this.signalConnectionId = await this.notificationService.getSelfConnectionId();
    }
}
