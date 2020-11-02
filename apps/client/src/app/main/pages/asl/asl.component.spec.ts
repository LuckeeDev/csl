import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AslComponent } from './asl.component';

describe('AslComponent', () => {
  let component: AslComponent;
  let fixture: ComponentFixture<AslComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AslComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AslComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
