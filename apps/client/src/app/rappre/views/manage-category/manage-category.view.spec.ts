import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCategoryView } from './manage-category.view';

describe('ManageCategoryView', () => {
  let component: ManageCategoryView;
  let fixture: ComponentFixture<ManageCategoryView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCategoryView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCategoryView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
