import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionePageComponent } from './commissione-page.component';

describe('CommissionePageComponent', () => {
  let component: CommissionePageComponent;
  let fixture: ComponentFixture<CommissionePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
