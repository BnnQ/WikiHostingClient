import {Component, Inject, OnInit} from '@angular/core';
import {SERVICE_IDENTIFIERS} from "./app.module";
import {INotificationService} from "../services/abstractions/i-notification-service";
import {IUserRepository} from "../services/abstractions/i-user-repository";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'WikiHostingClient';
  signalConnectionId: string = '';
  selfId: number = 0;

  constructor(@Inject(SERVICE_IDENTIFIERS.INotificationService) private readonly notificationService: INotificationService, @Inject(SERVICE_IDENTIFIERS.IUserRepository) private readonly userRepository: IUserRepository, private readonly toastService : ToastrService) {
  }

  async ngOnInit(): Promise<void> {
    this.signalConnectionId = await this.notificationService.getSelfConnectionId();
    this.selfId = await this.userRepository.getCurrentUserId();


  }

  logout() {
    sessionStorage.removeItem('currentUser');
    location.reload();
  }
}
