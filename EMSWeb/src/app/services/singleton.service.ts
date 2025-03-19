import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonDialogService } from './common-dialog.service';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class SingletonService {
  constructor(
    public route: Router,
    public commonDialogService: CommonDialogService, public http: HttpClient, public activateRoute: ActivatedRoute,
    public location: Location
  ) {}
}
