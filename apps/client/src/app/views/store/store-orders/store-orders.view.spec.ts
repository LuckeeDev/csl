import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOrdersView } from './store-orders.view';

describe('StoreOrdersView', () => {
  let component: StoreOrdersView;
  let fixture: ComponentFixture<StoreOrdersView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreOrdersView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreOrdersView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
