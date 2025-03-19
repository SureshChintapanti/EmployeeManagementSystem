import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RegistrationModel } from '../../Entities/RegistrationModel ';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { FloatingLabelModule } from '@progress/kendo-angular-label';
import { BaseclassComponent } from '../baseclass/baseclass.component';
import { SingletonService } from '../../services/singleton.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [SingletonService],
  imports: [FormsModule, FloatingLabelModule, InputsModule, ButtonModule, RouterLink, HttpClientModule]
})
export class LoginComponent extends BaseclassComponent {
  email: any = "";
  password: any = "";
  registrationModel: RegistrationModel = new RegistrationModel();
  showMsg: boolean = false;
  constructor(singletonService: SingletonService) {
    super(singletonService);
  }

  onLogin() {
    if (this.blnPageValueChanged && this.registrationModel.Username != "" && this.registrationModel.password != "") {
      const apiUrl = `api/Registration/login/?Username=${this.registrationModel.Username}&Password=${this.registrationModel.password}`;
      let obj = Object.assign({}, this.registrationModel);
      this.getData(apiUrl).subscribe((data: any) => {
        if (data.userId >= 1) {
          this.navigateTo('employees', { queryParams: { userId : data.userId, username : this.registrationModel.Username } });
          setTimeout(() => {
            this.showNotification("Login successful!");
          }, 1000)
        } else {
          this.showAlert("Alert", "Username or Password was not matched");
        }
      });
    }
    else{
      this.showAlert("Notification", "Please fill all the details!"); 
    }
  }


}
