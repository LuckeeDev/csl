import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardModelComponent } from './dashboard-model.component';

describe('DashboardModelComponent', () => {
  let component: DashboardModelComponent;
  let fixture: ComponentFixture<DashboardModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
