import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreSuccessView } from './store-success.view';

describe('StoreSuccessView', () => {
  let component: StoreSuccessView;
  let fixture: ComponentFixture<StoreSuccessView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreSuccessView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreSuccessView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
