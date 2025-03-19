import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-notification',
  standalone: true,  // Mark as standalone
  imports: [CommonModule,HttpClientModule],
  template: `
    <div *ngIf="isVisible" [ngClass]="getNotificationClass()" class="notification">
      {{ message }}
    </div>
  `,
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  message: string = '';
  type: 'success' | 'warning' | 'error' | 'info' = 'info';
  isVisible: boolean = false;

  constructor(private notificationService: NotificationService) {
    this.notificationService.notification$.subscribe((notification: any) => {
      this.message = notification.message;
      this.type = notification.type;
      this.isVisible = true;

      // Auto-hide after 3 seconds
      setTimeout(() => {
        this.isVisible = false;
      }, 3000);
    });
  }

  getNotificationClass(): string {
    return `notification-${this.type}`;
  }
}
