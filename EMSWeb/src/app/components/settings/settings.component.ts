import { Component } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  imports: [NavComponent,HttpClientModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

}
