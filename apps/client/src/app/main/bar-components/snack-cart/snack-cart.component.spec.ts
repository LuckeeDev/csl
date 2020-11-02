import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackCartComponent } from './snack-cart.component';

describe('SnackCartComponent', () => {
  let component: SnackCartComponent;
  let fixture: ComponentFixture<SnackCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
