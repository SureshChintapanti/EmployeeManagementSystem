import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { TextBoxModule, TextAreaModule, CheckBoxModule, InputsModule, TextBoxComponent } from '@progress/kendo-angular-inputs';
import { FloatingLabelModule } from '@progress/kendo-angular-label';
import { RegistrationModel } from '../../Entities/RegistrationModel ';
import { BaseclassComponent } from '../baseclass/baseclass.component';
import { SingletonService } from '../../services/singleton.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [CommonModule, HttpClientModule,
    TextBoxModule,
    TextAreaModule,
    ButtonModule, InputsModule,
    CheckBoxModule, FormsModule, DropDownsModule, FloatingLabelModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [SingletonService],
})
export class RegisterComponent extends BaseclassComponent {



  industries: string[] = ['IT', 'Finance', 'Healthcare', 'Education', 'Retail'];
  countries: string[] = ['India', 'USA', 'Canada', 'Australia', 'Germany'];
  companySize: string[] = ['1-10', '11-50', '51-200', '201-500', '500+'];
  isUpdate:boolean = false;
  termsAccepted: boolean = false;
  registrationModel: RegistrationModel = new RegistrationModel();
  title: string = "New Employer Registration";
  constructor(singletonService: SingletonService, public activateRoute: ActivatedRoute) {
    super(singletonService)
  }
  
  override ngOnInit(): void {
    this.activateRoute.queryParams.subscribe(params => {
      if (Object.keys(params).length != 0) {
        this.userId = params['userId'];
        this.getUserDetails();
        this.isUpdate = true;
      }
      else{
        this.registrationModel.operation = "I";
      }
    })
  }
  registerEmployer() {
    if (this.blnPageValueChanged) {
      const apiUrl = `api/Registration/save`;
      let obj = Object.assign({}, this.registrationModel);
      obj.phoneNumber = obj.phoneNumber.toString();
      obj.postalCode = obj.postalCode.toString();

      this.post(apiUrl, obj).subscribe((data: any) => {
        if (data) {
          this.navigateTo('login');
          setTimeout(() => {
            this.showNotification("successfully saved your changes");
          }, 500)
        } else {
          this.showAlert("Alert", "Registration failed!");
        }
      });
    }
    else {
      this.showAlert("Alert", "Please fill all the details!");
    }
  }

  onCancelClick() {
    if (this.blnPageValueChanged) {
      this.showConfirmation("Confirmation", "Do you want to save your changes?").subscribe((ref: any) => {
        if (ref) {
          this.fnValidate();
        }
        else{
          this.navigateTo("login");
        }
      })
    }
    else {
      this.location();
    }

  }


  checkTerms(ev: any) {
    this.blnPageValueChanged = true;
    this.termsAccepted = ev.target.checked;
  }



  fnValidate() {
    if (this.isNullOrEmpty(this.registrationModel.companyName)) {
      this.showAlert("Validation", "Please enter Company Name");
    }
    else if (this.isNullOrEmpty(this.registrationModel.industry)) {
      this.showAlert("Validation", "Please select Industry");
    }
    else if (this.isNullOrEmpty(this.registrationModel.numberOfEmployees)) {
      this.showAlert("Validation", "Please select Number of Employees");
    }
    else if (this.isNullOrEmpty(this.registrationModel.website)) {
      this.showAlert("Validation", "Please enter Website");
    }
    else if (this.isNullOrEmpty(this.registrationModel.companyDescription)) {
      this.showAlert("Validation", "Please enter Company Description");
    }
    else if (this.isNullOrEmpty(this.registrationModel.firstName)) {
      this.showAlert("Validation", "Please enter First Name");
    }
    else if (this.isNullOrEmpty(this.registrationModel.lastName)) {
      this.showAlert("Validation", "Please enter Last Name");
    }
    else if (this.isNullOrEmpty(this.registrationModel.jobTitle)) {
      this.showAlert("Validation", "Please enter Job Title");
    }
    else if (this.isNullOrEmpty(this.registrationModel.workEmail)) {
      this.showAlert("Validation", "Please enter Work Email");
    }
    else if (this.isNullOrEmpty(this.registrationModel.phoneNumber)) {
      this.showAlert("Validation", "Please enter Phone Number");
    }
    else if (this.isNullOrEmpty(this.registrationModel.streetAddress)) {
      this.showAlert("Validation", "Please enter Street Address");
    }
    else if (this.isNullOrEmpty(this.registrationModel.city)) {
      this.showAlert("Validation", "Please enter City");
    }
    else if (this.isNullOrEmpty(this.registrationModel.stateProvince)) {
      this.showAlert("Validation", "Please enter State/Province");
    }
    else if (this.isNullOrEmpty(this.registrationModel.postalCode)) {
      this.showAlert("Validation", "Please enter Postal Code");
    }
    else if (this.isNullOrEmpty(this.registrationModel.country)) {
      this.showAlert("Validation", "Please select Country");
    }
    else if (this.isNullOrEmpty(this.registrationModel.Username)) {
      this.showAlert("Validation", "Please enter Username");
    }
    else if (this.isNullOrEmpty(this.registrationModel.password)) {
      this.showAlert("Validation", "Please enter Password");
    }
    else if (this.isNullOrEmpty(this.registrationModel.confirmPassword)) {
      this.showAlert("Validation", "Please enter Confirm Password");
    }
    else if (!this.registrationModel.agreeToTerms) {
      this.showAlert("Validation", "Please agree to terms and conditions");
    }
    else {
      this.blnPageValueChanged = true;
      this.registerEmployer();
    }

  }

  countryChange(ev: any) {
    this.blnPageValueChanged = true;
    this.registrationModel.country = ev;
  }

  getUserDetails(){
    let apiUrl = "api/Registration/getRegistrationDetails/?RegisteredID=" + parseInt(this.userId);
    this.getData(apiUrl).subscribe((res: any) => {
      this.title = "Update Registration";
      this.registrationModel = res;
      this.registrationModel.postalCode = parseInt(this.registrationModel.postalCode);
      this.registrationModel.phoneNumber = parseInt(this.registrationModel.phoneNumber);
      this.registrationModel.operation = "U";
      this.registrationModel.registeredID = parseInt(this.userId);
      this.registrationModel.Username = res.username;
    })
  }


}


8