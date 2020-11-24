import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissioniComponent } from './commissioni.component';

describe('CommissioniComponent', () => {
  let component: CommissioniComponent;
  let fixture: ComponentFixture<CommissioniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissioniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
