import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreHomeView } from './store-home.view';

describe('StoreHomeView', () => {
  let component: StoreHomeView;
  let fixture: ComponentFixture<StoreHomeView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreHomeView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreHomeView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
