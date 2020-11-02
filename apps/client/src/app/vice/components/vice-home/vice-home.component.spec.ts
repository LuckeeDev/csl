import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViceHomeComponent } from './vice-home.component';

describe('ViceHomeComponent', () => {
  let component: ViceHomeComponent;
  let fixture: ComponentFixture<ViceHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViceHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViceHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
