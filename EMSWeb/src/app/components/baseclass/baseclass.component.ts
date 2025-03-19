import { Component, Input, OnInit } from '@angular/core';
import { SingletonService } from '../../services/singleton.service';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-baseclass',
  standalone: true,
  templateUrl: './baseclass.component.html',
  styleUrls: ['./baseclass.component.css'],
  imports: [HttpClientModule],
  providers: [SingletonService]
})
export class BaseclassComponent implements OnInit {
  //@Input() UserIdentifier : string = "";


  protected blnPageValueChanged: boolean = false;
  protected baseUrl: string = environment.baseUrl;

  // sortColumn: string = "EmployeeName";
  // sortDirection: string = "ASC";
  // filterName: any = "";
  // filterStatus: any = "";
  // sortDpColumn: string = "DepartmentName"
  // sortDpDirection: string = "ASC"
  // filterDpName: any = "";
  // departmentsCount: number = 0;
  // gridDpData: any;
  // empCount: any;
  // leaveCount: number = 0;
  // allDepartments: any;
  // gridEmpData: any;
  userId: string = "";
  constructor(public singletonService: SingletonService) {
  }

  ngOnInit()  {
    this.singletonService.activateRoute.queryParams.subscribe(params => {
      if(Object.keys(params).length != 0){
        this.userId = params['userId'];
      }
    });
  }


  navigateTo(route: string, options: any = {}) {
    this.singletonService.route.navigate([route], options);
  }

  showAlert(title: string, message: string) {
    this.singletonService.commonDialogService.showAlert(title, message);
  }

  valueChange(ev: any) {
    this.blnPageValueChanged = true;
  }

  showNotification(message: string) {
    this.singletonService.commonDialogService.showNotification(message);
  }

  showConfirmation(title: string, message: any) {
    return this.singletonService.commonDialogService.showConfirmation(title, message);
  }

  getData(endpoint: string): Observable<any> {
    const url = `${this.baseUrl}${endpoint}`;
    return this.singletonService.http.get<any>(url);
  }

  post(endpoint: string, obj: any): Observable<any> {
    const url = `${this.baseUrl}${endpoint}`;
    return this.singletonService.http.post<any>(url, obj);
  }

  showDialog(title: any, content: any){
    return this.singletonService.commonDialogService.showDialog(title, content);

  }


 



  isNullOrEmpty(value: any): boolean {
    return value === null || value === undefined || value === '';
  }
  location(){
    this.singletonService.location.back();
  }
}
