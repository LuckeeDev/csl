import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViceComponent } from './vice.component';

describe('ViceComponent', () => {
  let component: ViceComponent;
  let fixture: ComponentFixture<ViceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
