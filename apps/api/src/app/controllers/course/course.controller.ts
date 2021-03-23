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

	const {
		title,
		description,
		category,
		slot,
		speakers,
		notes,
		max,
	} = courseData;

	try {
		await new Course({
			id,
			title,
			description,
			category,
			slot,
			owner,
			speakers,
			notes,
			max,
		}).save();

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

export const getCourse = async (
	id: ICourse['id']
): Promise<IHttpRes<ICourse>> => {
	try {
		const course = await Course.findOne({ id });

		return {
			success: true,
			data: course,
		};
	} catch (err) {
		saveError(`Error while getting course with ID "${id}"`, {
			category: 'coge',
			err,
		});

		return {
			success: false,
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
	{
		course: id,
		slot,
	}: {
		course: ICourse['id'];
		slot: ICourse['slot'];
	}
): Promise<IHttpRes<void>> => {
	try {
		const course = await Course.findOne({ id });

		if (
			course.signupsCount &&
			course.signupsCount >= course.max - course.speakers.length
		) {
			return {
				success: false,
			};
		} else {
			const courseUpdateIndex = `courses.${slot}`;

			course.updateOne(
				{
					$push: { signups: { name: user.name, id: user.id } },
					$inc: { signupsCount: 1 },
				},
				{ upsert: true }
			);

			await User.findOneAndUpdate(
				{ id: user.id },
				{ [courseUpdateIndex]: course }
			);

			return {
				success: true,
			};
		}
	} catch (err) {
		console.log(err);

		saveError('Error while signing up to coge courses', {
			category: 'coge',
		});

		return {
			success: false,
			err,
		};
	}
};
