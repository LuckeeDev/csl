import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreErrorView } from './store-error.view';

describe('StoreErrorView', () => {
  let component: StoreErrorView;
  let fixture: ComponentFixture<StoreErrorView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreErrorView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreErrorView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
