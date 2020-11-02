import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSnackComponent } from './create-snack.component';

describe('CreateSnackComponent', () => {
  let component: CreateSnackComponent;
  let fixture: ComponentFixture<CreateSnackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSnackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSnackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
