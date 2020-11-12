import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenteHomeComponent } from './referente-home.component';

describe('ReferenteHomeComponent', () => {
  let component: ReferenteHomeComponent;
  let fixture: ComponentFixture<ReferenteHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferenteHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenteHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
