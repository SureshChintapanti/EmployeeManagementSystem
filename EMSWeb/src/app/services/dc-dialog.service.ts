import { Injectable } from '@angular/core';
import { DialogService, DialogRef } from '@progress/kendo-angular-dialog';

@Injectable({
  providedIn: 'root'
})
export class DcDialogService {
  constructor(private dialogService: DialogService) {}

  public openDialog(content: string, title: string = 'Message'): DialogRef {
    const dialogRef = this.dialogService.open({
      title: title,
      content: content,
      actions: [
        { text: 'Cancel' },
        { text: 'OK', primary: true }
      ]
    });

    dialogRef.result.subscribe((result: any) => {
      console.log('Dialog result:', result);
    });

    return dialogRef;
  }
}
