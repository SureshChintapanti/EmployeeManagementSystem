import { Injectable } from '@angular/core';
import { DialogService, DialogRef, DialogCloseResult } from '@progress/kendo-angular-dialog';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonDialogService {

  private notificationSubject = new BehaviorSubject<string | null>(null);
  public notification$ = this.notificationSubject.asObservable();

  constructor(private dialogService: DialogService) {}

  // Show Confirmation Dialog
  public showConfirmation(title: string, content: any): Observable<boolean> {
    const dialog: DialogRef = this.dialogService.open({
      title: title,
      content: content,
      actions: [{ text: 'Yes', themeColor: 'primary' }, { text: 'No'  }],
      width: 450,
      height: 200,
      minWidth: 250,
    });

    return new Observable<boolean>((observer) => {
      dialog.result.subscribe((result) => {
        if (result instanceof DialogCloseResult) {
          observer.next(false);
        } else {
          observer.next(result.text === 'Yes');
        }
        observer.complete();
      });
    });
  }

  // Show Alert Dialog
  public showAlert(title: string, content: string) {
   const dialog: DialogRef = this.dialogService.open({
      title: title,
      content: content,
      actions: [{ text: 'OK', themeColor: 'primary' }],
      width: 450,
      height: 200,
      minWidth: 250,
    });
    return new Observable<boolean>((observer) => {
      dialog.result.subscribe((result) => {
        if (result instanceof DialogCloseResult) {
          observer.next(false);
        } else {
          observer.next(result.text === 'OK');
        }
        observer.complete();
      });
    });
  }

  // Show Notification Message
  public showNotification(message: string) {
    this.notificationSubject.next(message);

    // Clear the notification after 3 seconds
    setTimeout(() => {
      this.notificationSubject.next(null);
    }, 3000);
  }


  public showDialog(title: string, content: any): Observable<any> {
    const dialog: DialogRef = this.dialogService.open({
      title: title,
      content: content,
      width: 450,
      height: 200,
      minWidth: 250,
    });
  
    return new Observable<any>((observer) => {
      dialog.result.subscribe((result) => {
        if (result instanceof DialogCloseResult) {
          observer.next(null);  // Return null when dialog is closed
        } else {
          observer.next(result);  // Return the entire result, including data
        }
        observer.complete();
      });
    });
  }
  
}
