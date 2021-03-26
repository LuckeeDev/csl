import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailsView } from './course-details.view';

describe('CourseDetailsView', () => {
  let component: CourseDetailsView;
  let fixture: ComponentFixture<CourseDetailsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseDetailsView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDetailsView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
