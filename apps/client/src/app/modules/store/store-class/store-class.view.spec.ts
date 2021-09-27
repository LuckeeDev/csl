import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreClassView } from './store-class.view';

describe('StoreClassView', () => {
  let component: StoreClassView;
  let fixture: ComponentFixture<StoreClassView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreClassView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreClassView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
