import { Schema, model } from 'mongoose';
import { ICourse, ICourseModel, IHttpRes, IUser } from '@csl/shared';
import { v4 } from 'uuid';

const CourseSchema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  notes: { type: String },
  duration: { type: Number, required: true },
  slots: { type: Array, required: true },
  owner: { type: String, required: true },
  speakers: { type: Array, required: true },
  status: { type: String, required: true, default: 'WAITING' },
});

export const Course = model<ICourseModel>('course', CourseSchema);

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
