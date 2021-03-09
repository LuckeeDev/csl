import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CogeViewComponent } from './coge-view.component';

describe('CogeComponent', () => {
  let component: CogeViewComponent;
  let fixture: ComponentFixture<CogeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CogeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CogeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
