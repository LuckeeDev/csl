import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAccountView } from './service-account.view';

describe('ServiceAccountView', () => {
  let component: ServiceAccountView;
  let fixture: ComponentFixture<ServiceAccountView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceAccountView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceAccountView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
