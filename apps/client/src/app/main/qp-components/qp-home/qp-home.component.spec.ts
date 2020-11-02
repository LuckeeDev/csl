import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QpHomeComponent } from './qp-home.component';

describe('QpHomeComponent', () => {
  let component: QpHomeComponent;
  let fixture: ComponentFixture<QpHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QpHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QpHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
