import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { GridModule } from '@progress/kendo-angular-grid';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavComponent } from "./components/nav/nav.component";
import { DialogModule } from '@progress/kendo-angular-dialog';
import { AddemployeeComponent } from "./components/addemployee/addemployee.component";
import { CommonDialogService } from './services/common-dialog.service';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, GridModule, RouterModule, HttpClientModule, DialogModule],
  providers: []  // Provides service at component level
})
export class AppComponent {
  notificationMessage: string | null = null;

  constructor() {
    
  }
  
}
