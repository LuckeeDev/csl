import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CogeView } from './coge.view';

describe('CogeView', () => {
  let component: CogeView;
  let fixture: ComponentFixture<CogeView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CogeView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CogeView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
