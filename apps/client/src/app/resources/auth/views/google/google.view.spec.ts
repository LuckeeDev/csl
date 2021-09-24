import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleView } from './google.view';

describe('GoogleView', () => {
  let component: GoogleView;
  let fixture: ComponentFixture<GoogleView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
