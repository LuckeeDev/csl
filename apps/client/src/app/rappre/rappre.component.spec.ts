import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RappreComponent } from './rappre.component';

describe('RappreComponent', () => {
  let component: RappreComponent;
  let fixture: ComponentFixture<RappreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RappreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RappreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
