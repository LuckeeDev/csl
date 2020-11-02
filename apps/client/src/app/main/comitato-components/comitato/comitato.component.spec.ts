import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComitatoComponent } from './comitato.component';

describe('ComitatoComponent', () => {
  let component: ComitatoComponent;
  let fixture: ComponentFixture<ComitatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComitatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComitatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
