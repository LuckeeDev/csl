import { ICourse, IHttpRes, IUser } from '@csl/shared';
import { v4 } from 'uuid';
import { Course, User } from '@models';
import { saveError } from '@common/logs';

export const createCourse = async (
	courseData: ICourse,
	user: IUser
): Promise<IHttpRes<any>> => {
	const id = v4();
	const owner = user.id;

	const { title, description, category, slot, speakers } = courseData;

	try {
		await new Course({
			id,
			title,
			description,
			category,
			slot,
			owner,
			speakers,
		})
			.save();
			
		return {
			success: true,
		};
	} catch (err) {
		return {
			success: false,
			err,
		};
	}
};

export const getCourses = async (user: IUser): Promise<IHttpRes<ICourse[]>> => {
	try {
		const courses = await Course.find({ owner: user.id });

		return {
			success: true,
			data: courses,
		};
	} catch (err) {
		return {
			success: false,
			err,
		};
	}
};

export const getAllCourses = async (): Promise<IHttpRes<ICourse[]>> => {
	try {
		const result = await Course.find();

		return {
			success: true,
			data: result,
		};
	} catch (err) {
		saveError('Error while retrieving all the courses', {
			err,
			category: 'coge',
		});

		return {
			success: false,
			err,
		};
	}
};

export const signUpToCourse = async (
	user: IUser,
	{ courses, slot }: { courses: ICourse['id'][]; slot: ICourse['slot'] }
): Promise<IHttpRes<void>> => {
	try {
		const coursesPromises = courses.map((course, i) => {
			const fieldToIncrement = `option${i + 1}`;

			return Course.findOneAndUpdate(
				{ id: course },
				{ $inc: { [fieldToIncrement]: 1 } }
			);
		});

		await Promise.all(coursesPromises);

		const courseUpdateIndex = `courses.${slot}`;

		await User.findOneAndUpdate(
			{ id: user.id },
			{ [courseUpdateIndex]: courses }
		);

		return {
			success: true,
		};
	} catch (err) {
		saveError('Error while signing up to coge courses', {
			category: 'coge',
		});

		return {
			success: false,
			err,
		};
	}
};
