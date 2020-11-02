import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackSingleClassComponent } from './snack-single-class.component';

describe('SnackSingleClassComponent', () => {
  let component: SnackSingleClassComponent;
  let fixture: ComponentFixture<SnackSingleClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackSingleClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackSingleClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
