import { Component } from '@angular/core';
import { GridModule } from '@progress/kendo-angular-grid';
import { NavComponent } from "../nav/nav.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  imports: [GridModule, NavComponent,HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
employees: any;
gridData: any|null;

}
