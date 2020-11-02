import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QpAdminComponent } from './qp-admin.component';

describe('QpAdminComponent', () => {
  let component: QpAdminComponent;
  let fixture: ComponentFixture<QpAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QpAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QpAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
