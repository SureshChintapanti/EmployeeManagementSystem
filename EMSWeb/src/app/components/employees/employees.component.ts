import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { GridComponent, GridModule } from '@progress/kendo-angular-grid';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from "../nav/nav.component";
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { CommonModule } from '@angular/common';
import { SingletonService } from '../../services/singleton.service';
import { BaseclassComponent } from '../baseclass/baseclass.component';
import { ContextMenuComponent, ContextMenuModule, ContextMenuSelectEvent } from '@progress/kendo-angular-menu';
import { Employee } from '../../Entities/employee';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-employees',
  imports: [GridModule, HttpClientModule, NavComponent, ButtonsModule,CommonModule, ContextMenuModule, RouterLink, RouterLinkActive],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
  providers: [SingletonService],
})
export class EmployeesComponent extends BaseclassComponent implements OnInit {
empCount: any;
leaveCount: any;
departmentsCount: any;
gridEmpData: any[] = [];
  sortColumn: any = "EmployeeFullName";
  sortDirection: any;
  filterName: string= "";
  filterStatus: any;
  UserId: any;
  allDepartments: any;


  sortDpColumn: string = "DepartmentName"
  sortDpDirection: string = "ASC"
  filterDpName: any = "";
  gridDpData: any;
  public selectedItem: any;
  public contextMenuEvent: any;
  contextMenu: any;

  @ViewChild("gridmenu") public gridContextMenu!: ContextMenuComponent;
  @ViewChild("grid") public grid!: GridComponent;

  public menuItems: any = [ {text: "Delete" }]

  public mySelection: string[] = ["ALFKI", "ANTON", "BERGS"];
  public showCommandRow: boolean = false;

    employeeObj: Employee = new Employee();
  
  private rowIndex: any;
  private contextItem: any;
  constructor(singletonService: SingletonService) {
    super(singletonService)
  }

  public onSelect(item:any ): void {
   
      this.deleteEmployee(); 

  }


  public onCellClick(e: any): void {
    if (e.type === "contextmenu") {
      const originalEvent = e.originalEvent;
      originalEvent.preventDefault();

      this.grid.closeRow(this.rowIndex);

      this.rowIndex = e.rowIndex;
      this.contextItem = e.dataItem;
      this.showCommandRow = false;

      this.gridContextMenu.show({
        left: originalEvent.pageX,
        top: originalEvent.pageY,
      });
    }
  }

  deleteEmployee(){
    this.showConfirmation("Validation","Are you sure you want to delete this employee?").subscribe((result:any) => {
      if (result) {
        this.employeeObj.Ip_operation = "D";
        this.employeeObj.EmployeeId = this.contextItem.EmployeeID;
        this.employeeObj.UserIdentifier = this.UserId;
        this.post("api/Employee/saveEmployee", this.employeeObj).subscribe((data: any) => {
          if (data) {
            this.showNotification("Deleted successful!");
            this.getDataSet();
            this.getDpSet();
          }
        })
        
      }
    })
  }
  override ngOnInit(): void {
    this.singletonService.activateRoute.queryParams.subscribe(params => {
      if (Object.keys(params).length != 0) {
        this.UserId = params['userId'];
        //this.getDataSet();
        this.getDpSet();
        this.getDataSet();
      }
    });
  }


  fnSortChange(ev: any){
    if(this.gridEmpData.length == 0) return;
    this.sortColumn = ev[0].field;  
    this.sortDirection = ev[0].dir;
    this.getDataSet();
  }
  
  addEmployee(){
    if(this.departmentsCount > 0){
      this.navigateTo("add-employee", { queryParams: { userId: this.UserId} });
    }
    else{
      this.showAlert("Validation","Please go Departments tab and add a department first.")
    }
  }


  
  getDataSet() {
    this.sortColumn = this.sortColumn || 'EmployeeFullName';
    this.sortDirection = this.sortDirection || 'ASC';
    const apiUrl = `api/Employee/GetEmployees/?sortColumn=${this.sortColumn}&sortDirection=${this.sortDirection}&filterName=${this.filterName}&UserId=${this.UserId}`;
    this.getData(apiUrl).subscribe((res: any) => {
      this.gridEmpData = JSON.parse(res.data);
      this.empCount = this.gridEmpData.length;
      this.leaveCount = 0;
      this.gridEmpData.forEach((element: any) => {
        if (element.EmploymentStatus == "On Leave") {
          this.leaveCount = this.leaveCount || 0;
          this.leaveCount++
        }
      });
    });
  }


  getDpSet() {
    this.sortDpColumn = this.sortDpColumn || 'DepartmentName';
    this.sortDpDirection = this.sortDpDirection || 'ASC';
    this.filterDpName = this.filterDpName;
    const apiUrl = `api/Department/GetDepartments/?sortColumn=${this.sortDpColumn}&sortDirection=${this.sortDpDirection}&filterName=${this.filterDpName}&UserIdentifier=${this.UserId}`;
    this.getData(apiUrl).subscribe((res: any) => {
      this.gridDpData = JSON.parse(res.data);
      this.departmentsCount = this.gridDpData.length;
      this.allDepartments = [];
      this.gridDpData.forEach((element: any) => {
        this.allDepartments.push({ DepartmentID: element.DepartmentID, DepartmentName: element.DepartmentName });
      })
    });
  }

}
