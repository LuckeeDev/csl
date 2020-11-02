import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RappreHomeComponent } from './rappre-home.component';

describe('RappreHomeComponent', () => {
  let component: RappreHomeComponent;
  let fixture: ComponentFixture<RappreHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RappreHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RappreHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
