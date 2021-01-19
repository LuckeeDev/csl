import { ICourse, IHttpRes, IUser } from '@csl/shared';
import { v4 } from 'uuid';
import { Course } from '@models';

export const createCourse = async (
  courseData: ICourse,
  user: IUser
): Promise<IHttpRes<any>> => {
  const id = v4();
  const owner = user.id;

  const { title, description, notes, duration, slots, speakers } = courseData;

  return new Course({
    id,
    title,
    description,
    notes,
    duration,
    slots,
    owner,
    speakers,
  })
    .save()
    .then(() => {
      return {
        success: true,
      };
    })
    .catch((err) => {
      return {
        success: false,
        err,
      };
    });
};

export const getCourses = (user: IUser): Promise<IHttpRes<ICourse[]>> => {
  return Course.find({ owner: user.id })
    .then((courses) => {
      return {
        success: true,
        data: courses,
      };
    })
    .catch((err) => {
      return {
        success: false,
        err,
      };
    });
};
