import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortartiComponent } from './portarti.component';

describe('PortartiComponent', () => {
  let component: PortartiComponent;
  let fixture: ComponentFixture<PortartiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortartiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortartiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
