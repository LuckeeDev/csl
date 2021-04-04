import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreView } from './store.view';

describe('StoreView', () => {
  let component: StoreView;
  let fixture: ComponentFixture<StoreView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
