import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCatalogView } from './store-catalog.view';

describe('StoreCatalogView', () => {
  let component: StoreCatalogView;
  let fixture: ComponentFixture<StoreCatalogView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreCatalogView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCatalogView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
