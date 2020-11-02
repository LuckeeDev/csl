import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissioneComponent } from './commissione.component';

describe('CommissioneComponent', () => {
  let component: CommissioneComponent;
  let fixture: ComponentFixture<CommissioneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissioneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
