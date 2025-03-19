import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent, GridModule } from '@progress/kendo-angular-grid';
import { NavComponent } from "../nav/nav.component";
import { RouterLink } from '@angular/router';
import { SingletonService } from '../../services/singleton.service';
import { BaseclassComponent } from '../baseclass/baseclass.component';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { AdddepartmentComponent } from '../adddepartment/adddepartment.component';
import { ContextMenuComponent, ContextMenuModule } from '@progress/kendo-angular-menu';

@Component({
  selector: 'app-departments',
  imports: [ContextMenuModule, GridModule, HttpClientModule, NavComponent, ButtonModule],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css',
  providers: [SingletonService],

})
export class DepartmentsComponent extends BaseclassComponent implements OnInit {


  @ViewChild("gridmenu") public gridContextMenu!: ContextMenuComponent;
  @ViewChild("grid") public grid!: GridComponent;

  public menuItems: any = [{ text: "Delete" }]

  sortDpColumn: string = "DepartmentName"
  sortDpDirection: string = "ASC"
  filterDpName: any = "";
  departmentsCount: number = 0;
  gridDpData: any;
  UserIdentifier: string = "";
  contextItem: any;

  constructor(singletonService: SingletonService) {
    super(singletonService)

  }
  override ngOnInit(): void {
    this.singletonService.activateRoute.queryParams.subscribe(params => {
      if (Object.keys(params).length != 0) {
        this.UserIdentifier = params['userId'];
        //this.getDataSet();
        //this.getDpSet();
      }
    });
    this.getDpSet();
  }


  addDepartment() {
    this.showDialog("Add Department", AdddepartmentComponent).subscribe((ref: any) => {
      if (ref.isSuccess) {
        this.getDpSet();
        setTimeout(() => {
          this.showNotification("successfully saved your changes");
        }, 1000)
      }
    });
  }


  fnSortChange(ev: any) {
    this.sortDpColumn = ev[0].field;
    this.sortDpDirection = ev[0].dir;
    this.getDpSet();
  }

  getDpSet() {
    // Initialize default values if not already set
    this.sortDpColumn = this.sortDpColumn || 'DepartmentName';
    this.sortDpDirection = this.sortDpDirection || 'ASC';
    this.filterDpName = this.filterDpName;

    // Construct the API URL dynamically
    const apiUrl = `api/Department/GetDepartments/?sortColumn=${this.sortDpColumn}&sortDirection=${this.sortDpDirection}&filterName=${this.filterDpName}&UserIdentifier=${this.UserIdentifier}`;

    this.getData(apiUrl).subscribe((res: any) => {
      this.gridDpData = JSON.parse(res.data);
      this.departmentsCount = this.gridDpData.length;
      // this.allDepartments = [];

      // this.gridDpData.forEach((element: any) => {
      //   this.allDepartments.push({ DepartmentID: element.DepartmentID, DepartmentName: element.DepartmentName });
      // });

    });
  }

  public onSelect(item: any): void {

    this.deleteDepartment();

  }
  deleteDepartment() {
    this.showConfirmation("Validation", "If you delete this department, all its employees will be deleted as well. Are you sure you want to delete this department?").subscribe((result: any) => {
      if (result) {

        let apiUrl = "api/Department/saveDepartment";
        let params = {
          Op_Operation: "D",
          DepartmentName: this.contextItem.DepartmentName,
          UserIdentifier: this.UserIdentifier
        };

        this.post(apiUrl, params).subscribe((data: any) => {
          this.getDpSet();
        });
      }
    })

  }

  public onCellClick(e: any): void {
    if (e.type === "contextmenu") {
      const originalEvent = e.originalEvent;
      originalEvent.preventDefault();


      this.rowIndex = e.rowIndex;
      this.contextItem = e.dataItem;

      this.gridContextMenu.show({
        left: originalEvent.pageX,
        top: originalEvent.pageY,
      });
    }
  }
  rowIndex(rowIndex: any) {
    throw new Error('Method not implemented.');
  }


}
