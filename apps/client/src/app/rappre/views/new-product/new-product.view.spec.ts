import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductView } from './new-product.view';

describe('NewProductView', () => {
  let component: NewProductView;
  let fixture: ComponentFixture<NewProductView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProductView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProductView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
