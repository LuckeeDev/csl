import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QpComponent } from './qp.component';

describe('QpComponent', () => {
  let component: QpComponent;
  let fixture: ComponentFixture<QpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
