import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { TextBoxModule, InputsModule } from '@progress/kendo-angular-inputs';
import { FloatingLabelModule } from '@progress/kendo-angular-label';
import { BaseclassComponent } from '../baseclass/baseclass.component';
import { SingletonService } from '../../services/singleton.service';

@Component({
  selector: 'app-forget-password',
  imports: [HttpClientModule, CommonModule, FloatingLabelModule, TextBoxModule, ButtonModule, InputsModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
  providers: [SingletonService],
})
export class ForgetPasswordComponent extends BaseclassComponent {
  email: string = '';

  constructor(singletonService: SingletonService) {
    super(singletonService);
  }

  sendResetLink(){
    this.singletonService.commonDialogService.showAlert('Alert', 'Password reset link has work in progress').subscribe((result) => {
      if (result) {
        this.navigateTo('login');
      }
    })
  
  }
}
