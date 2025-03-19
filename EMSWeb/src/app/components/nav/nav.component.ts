import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonDialogService } from '../../services/common-dialog.service';
import { HttpClientModule } from '@angular/common/http';
import { BaseclassComponent } from '../baseclass/baseclass.component';
import { SingletonService } from '../../services/singleton.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  imports: [RouterLink, RouterLinkActive,HttpClientModule],
})
export class NavComponent extends BaseclassComponent {
  userName: string = '';
  constructor(singletonService: SingletonService) {
    super(singletonService)
  }

  getDetails(tab: any): void {
    this.singletonService.activateRoute.queryParams.subscribe(params => {
      if(Object.keys(params).length != 0){
        this.userId = params['userId'];
        this.userName = params['username'];
      }
      if(tab == 'employee'){
        this.navigateTo('employees', { queryParams: { userId: this.userId, username: this.userName } });
      }
      else{
        this.navigateTo('departments', { queryParams: { userId: this.userId, username: this.userName } });
      }
    });
  }
  dashboard() {
    //this.route.navigate(['dashboard']);
  }

  onLogOut() {
    this.showConfirmation('Log Out', 'Are you sure you want to log out?')
      .subscribe((confirmed) => {
        if (confirmed) {
          this.navigateTo('login');  
        } else {
          console.log('User canceled logout');
        }
      });
  }

}
