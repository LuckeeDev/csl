import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsView } from './stats.view';

describe('StatsView', () => {
  let component: StatsView;
  let fixture: ComponentFixture<StatsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
