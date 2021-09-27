import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePaymentsView } from './store-payments.view';

describe('StorePaymentsView', () => {
  let component: StorePaymentsView;
  let fixture: ComponentFixture<StorePaymentsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorePaymentsView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorePaymentsView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
