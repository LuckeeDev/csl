import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProductView } from './store-product.view';

describe('StoreProductView', () => {
  let component: StoreProductView;
  let fixture: ComponentFixture<StoreProductView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreProductView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
