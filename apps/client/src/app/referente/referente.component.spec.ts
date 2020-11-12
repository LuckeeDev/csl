import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenteComponent } from './referente.component';

describe('ReferenteComponent', () => {
  let component: ReferenteComponent;
  let fixture: ComponentFixture<ReferenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
