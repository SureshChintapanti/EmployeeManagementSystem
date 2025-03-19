/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BaseclassComponent } from './baseclass.component';

describe('BaseclassComponent', () => {
  let component: BaseclassComponent;
  let fixture: ComponentFixture<BaseclassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseclassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
