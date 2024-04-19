import {Injectable} from "@angular/core";
import {INotificationService} from "./abstractions/i-notification-service";
import {HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel} from "@microsoft/signalr";
import {environment} from "../environments/environment";
import {ToastrService} from "ngx-toastr";

@Injectable({ providedIn: 'root' })
export class SignalNotificationService implements INotificationService {
  private connection?: HubConnection;
  constructor(private readonly toastService: ToastrService) {
  }

  private async connect(): Promise<void> {
    this.connection = new HubConnectionBuilder()
      .withUrl(environment.notificationHubUrl)
      .configureLogging(
        environment.production ? LogLevel.Error : LogLevel.Information
      )
      .build();

    if (environment.production) {
      await this.connection.start();
    } else {
      await this.connection
        .start()
        .then(() =>
          console.log('Successfully established connection with SignalR hub')
        )
        .catch((err) =>
          console.log(
            'Failed to establish connection with SignalR service: ' + err
          )
        );

      this.connection.on('received-notification', (message) => {
          this.toastService.info(message);

          console.log('Received notification: ', message);
          let notifications = JSON.parse(localStorage.getItem('notifications') ?? 'null') || [];
          notifications.push(message);
          localStorage.setItem('notifications', JSON.stringify(notifications));
        }
      );
    }
  }

  private async ensureConnection(): Promise<void> {
    if (this.connection && (this.connection.state == HubConnectionState.Connected || this.connection.state == HubConnectionState.Connecting))
      return;

      await this.connect();
  }

  async getSelfConnectionId(): Promise<string> {
    await this.ensureConnection();

    return this.connection!.connectionId!;
  }

  async on(
    methodName: string,
    handler: (...args: any[]) => any
  ): Promise<void> {
    await this.ensureConnection();

    this.connection!.on(methodName, handler);
  }
}
