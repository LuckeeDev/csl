import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QpAdminHomeComponent } from './qp-admin-home.component';

describe('QpAdminHomeComponent', () => {
  let component: QpAdminHomeComponent;
  let fixture: ComponentFixture<QpAdminHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QpAdminHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QpAdminHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
