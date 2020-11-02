import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackOrdersComponent } from './snack-orders.component';

describe('SnackOrdersComponent', () => {
  let component: SnackOrdersComponent;
  let fixture: ComponentFixture<SnackOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
