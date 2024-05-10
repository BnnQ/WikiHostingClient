import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit
{
  constructor(private readonly toastService : ToastrService) {
  }

  notifications = [
    {
      timestamp: '2 hours ago',
      subtitle: 'Achievement earned!',
      text: 'Wikis Are Fun.\n' +
        '                    Visit the Wiki while logged in 3 days in a row.'
    },
    {
      timestamp: '2 hours ago',
      subtitle: 'Achievement earned!',
      text: 'Wikis Are Fun.\n' +
        '                    Visit the Wiki while logged in 6 days in a row.'
    },
    {
      timestamp: '2 hours ago',
      subtitle: 'Achievement earned!',
      text: 'Wikis Are Fun.\n' +
        '                    Visit the Wiki while logged in 3 days in a row.'
    },
  ];

  notificationsToDisplay = this.notifications;

  search(event : Event) {
    this.notificationsToDisplay = this.notifications.filter((notification) => {
      return notification.text.includes((event.target as HTMLInputElement).value);
    });
  }

  ngOnInit(): void {
    this.toastService.info('Achievement earned! See details in the notifications feed.');
  }
}
