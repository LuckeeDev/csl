import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarAdminComponent } from './bar-admin.component';

describe('BarAdminComponent', () => {
  let component: BarAdminComponent;
  let fixture: ComponentFixture<BarAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
