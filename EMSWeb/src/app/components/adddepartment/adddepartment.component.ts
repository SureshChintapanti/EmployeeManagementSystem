import { Component } from '@angular/core';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { HttpClientModule } from '@angular/common/http';
import { FloatingLabelModule } from '@progress/kendo-angular-label';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { CommonDialogService } from '../../services/common-dialog.service';
import { CommonSingletonService } from '../../services/common-singleton.service';

@Component({
  selector: 'app-adddepartment',
  imports: [ButtonsModule, HttpClientModule, InputsModule, FloatingLabelModule, CommonModule, FormsModule],
  templateUrl: './adddepartment.component.html',
  styleUrl: './adddepartment.component.css',
  providers:[CommonSingletonService]
})
export class AdddepartmentComponent {



  userName: string = "";
  departmentName: string = "";
  blnPageValueChanged: boolean = false;
  userId: string = "";
  constructor(public route: ActivatedRoute, public dref: DialogRef, public conDialog: CommonDialogService,
    public commonSingletonService : CommonSingletonService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length != 0) {
        this.userName = params['username'];
        this.userId = params['userId'];

      }
    })
  }

  valueChange(av: any) {
    this.blnPageValueChanged = true;
  }

  addDepartment() {
  }
  
  cancel() {
    if(this.blnPageValueChanged){
      this.conDialog.showConfirmation('Confirmation', 'Do you want to save your changes?').subscribe((ref: any) => {
        if (ref) {
          this.fnValidate();
        }
      })
    }
    else{
      this.dref.close();
    }
  }
  
 
  fnValidate() {
    if (!this.departmentName) {
      this.conDialog.showAlert('Validation', 'Please enter department name');
      return;
    }
  
    let apiUrl = "api/Department/saveDepartment"; 
    let params = {
      Op_Operation: "I",
      DepartmentName: this.departmentName,
      UserIdentifier: this.userId
    };
  
    this.commonSingletonService.post(apiUrl, params).subscribe((data: any) => {
      if (data.isSuccess) {
        this.dref.close(data);
        // Handle success
      } else {
        this.conDialog.showAlert("Alert", "Department already exists!");
      }
    });
  }
}
