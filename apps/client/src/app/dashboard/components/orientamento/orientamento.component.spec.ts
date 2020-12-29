import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrientamentoComponent } from './orientamento.component';

describe('OrientamentoComponent', () => {
  let component: OrientamentoComponent;
  let fixture: ComponentFixture<OrientamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrientamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrientamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
