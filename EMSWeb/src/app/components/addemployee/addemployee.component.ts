import { Component, Injector } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { TextBoxModule, TextAreaModule, CheckBoxModule, InputsModule } from '@progress/kendo-angular-inputs';
import { FloatingLabelModule } from '@progress/kendo-angular-label';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { Employee } from '../../Entities/employee';
import { BaseclassComponent } from '../baseclass/baseclass.component';
import { SingletonService } from '../../services/singleton.service';
import { EmployeesComponent } from '../employees/employees.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-addemployee',
  imports: [NavComponent, CommonModule, HttpClientModule,
    TextBoxModule,
    TextAreaModule,
    ButtonModule,
    CheckBoxModule, FormsModule, DropDownsModule, FloatingLabelModule, InputsModule, DateInputsModule],
  templateUrl: './addemployee.component.html',
  styleUrl: './addemployee.component.css',
  providers: [SingletonService],
})
export class AddemployeeComponent extends EmployeesComponent {

  countries: string[] = ['India', 'USA', 'Canada', 'Australia', 'Germany'];
  allEmploymentStatus: string[] = ['Active', 'Inactive', 'On Leave'];
  title: string = "New Employee Registration";
  blPageValueChanged: boolean = false;
  employeeId: string = '';
  constructor(singletonService: SingletonService) {
    super(singletonService);
  }
  override ngOnInit(): void {
    this.singletonService.activateRoute.queryParams.subscribe(params => {
      if (Object.keys(params).length != 0) {
        this.UserId = params['userId'];
        if (params['employeeId']) {
          this.employeeId = params['employeeId'];
          this.title = "Update Employee";
          this.getEmployeeDetails(this.employeeId);
        }
        
      }
    });
    this.getDpSet();
  }



  onCancelClick() {
    if (this.blPageValueChanged) {

      this.showConfirmation('Confirmation', 'Are you sure you want to cancel?')
        .subscribe((confirmed) => {
          if (confirmed) {
            this.navigateTo('employees');
          }
        });
    }
    else {
      this.location();
    }
  }





  onDepartmentChange(ev: any) {
    this.blPageValueChanged = true;
    this.employeeObj.Department = ev;
    this.employeeObj.DepartmentName = ev.DepartmentName;
    this.employeeObj.DepartmentID = ev.DepartmentID;
  }

  saveEmployee() {
    this.singletonService.activateRoute.queryParams.subscribe(params => {
      if (Object.keys(params).length != 0) {
        this.UserId = params['userId'];
      }
    });
    const apiUrl = `api/Employee/saveEmployee`;

    let obj = Object.assign({}, this.employeeObj);
    obj.PhoneNumber = obj.PhoneNumber.toString();
    obj.EmergencyPhone = obj.EmergencyPhone.toString();
    if(this.title == "Update Employee"){
      obj.Ip_operation = "U";
    }
    else{
      obj.Ip_operation = "I";
    }
    obj.UserIdentifier = this.UserId;
    this.post(apiUrl, obj).subscribe((data: any) => {
      if (data) {
        this.location();
        this.showNotification("Saved successful!");

      }
    })

  }

  fnValidate() {
    if (this.isNullOrEmpty(this.employeeObj.FirstName)) {
      this.showAlert("Validation", "Please enter First Name");
    }
    else if (this.isNullOrEmpty(this.employeeObj.LastName)) {
      this.showAlert("Validation", "Please enter Last Name");
    }
    else if (this.isNullOrEmpty(this.employeeObj.Email)) {
      this.showAlert("Validation", "Please enter Email");
    }
    else if (this.isNullOrEmpty(this.employeeObj.PhoneNumber)) {
      this.showAlert("Validation", "Please enter Phone Number");
    }
    else if (this.isNullOrEmpty(this.employeeObj.HomeAddress)) {
      this.showAlert("Validation", "Please enter Home Address");
    }
    else if (this.isNullOrEmpty(this.employeeObj.Position)) {
      this.showAlert("Validation", "Please enter Position");
    }
    else if (this.isNullOrEmpty(this.employeeObj.StartDate)) {
      this.showAlert("Validation", "Please enter Start Date");
    }
    else if (this.isNullOrEmpty(this.employeeObj.Salary)) {
      this.showAlert("Validation", "Please enter Salary");
    }
    else if (this.isNullOrEmpty(this.employeeObj.DepartmentName)) {
      this.showAlert("Validation", "Please select Department");
    }
    else if (this.isNullOrEmpty(this.employeeObj.ContactName)) {
      this.showAlert("Validation", "Please enter Contact Name");
    }
    else if (this.isNullOrEmpty(this.employeeObj.Relationship)) {
      this.showAlert("Validation", "Please enter Relationship");
    }
    else if (this.isNullOrEmpty(this.employeeObj.Notes)) {
      this.showAlert("Validation", "Please enter Notes");
    }
    else if (this.isNullOrEmpty(this.employeeObj.EmergencyPhone)) {
      this.showAlert("Validation", "Please enter Emergency Phone");
    }
    else {
      this.saveEmployee();
    }

  }

  getEmployeeDetails(employeeId: string) {
    let empId = parseInt(employeeId);
    let usrId = parseInt(this.UserId);
    let apiUrl = "api/Employee/get-employee?employeeId=" + empId + "&userId=" + usrId;
    this.getData(apiUrl).subscribe((res: any) => {
      if(res){
        res.PhoneNumber = parseInt(res.PhoneNumber);
        res.EmergencyPhone = parseInt(res.EmergencyPhone);
        this.employeeObj = res;
        this.employeeObj.Department = {
          DepartmentID: res.DepartmentID,
          DepartmentName: res.DepartmentName}
      }
    })
  }
}
