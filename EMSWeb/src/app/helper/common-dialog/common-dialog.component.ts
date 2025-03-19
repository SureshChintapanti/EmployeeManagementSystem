import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { DialogService, DialogRef, DialogCloseResult } from '@progress/kendo-angular-dialog';

@Component({
  selector: 'app-common-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.css'],
  imports: [HttpClientModule],
})
export class CommonDialogComponent {
  constructor(private dialogService: DialogService) {}

  public result: any;

  public showConfirmation(): void {
    const dialog: DialogRef = this.dialogService.open({
      title: 'Please confirm',
      content: 'Are you sure?',
      actions: [{ text: 'No' }, { text: 'Yes', themeColor: 'primary' }],
      width: 450,
      height: 200,
      minWidth: 250,
    });

    dialog.result.subscribe((result) => {
      if (result instanceof DialogCloseResult) {
        console.log('Dialog closed without action');
      } else {
        console.log('Dialog action:', result);
      }

      this.result = JSON.stringify(result);
    });
  }
}
