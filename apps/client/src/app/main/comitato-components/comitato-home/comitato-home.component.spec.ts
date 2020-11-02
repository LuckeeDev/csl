import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComitatoHomeComponent } from './comitato-home.component';

describe('ComitatoHomeComponent', () => {
  let component: ComitatoHomeComponent;
  let fixture: ComponentFixture<ComitatoHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComitatoHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComitatoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
