import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CogeComponent } from './coge.component';

describe('CogeComponent', () => {
  let component: CogeComponent;
  let fixture: ComponentFixture<CogeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CogeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
