import { CourseStatusPipe } from './course-status.pipe';

describe('CourseStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new CourseStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
