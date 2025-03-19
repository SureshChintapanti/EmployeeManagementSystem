import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseclassComponent } from '../baseclass/baseclass.component';
import { SingletonService } from '../../services/singleton.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-welcome',
  imports: [HttpClientModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
  providers: [SingletonService],
})
export class WelcomeComponent extends BaseclassComponent {

  constructor(singletonService: SingletonService) {
    super(singletonService);
  }

  login() {
    this.navigateTo('login');
  }


  register() {
    this.navigateTo('new-user');
  }
}
