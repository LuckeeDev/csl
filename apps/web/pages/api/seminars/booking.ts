import Joi from 'joi';
import isLoggedIn from 'middlewares/isLoggedIn';
import session from 'middlewares/session';
import validate from 'middlewares/validate';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import prisma from 'prisma/client';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

const postBodySchema = Joi.object({
	seminarId: Joi.string().required(),
});

handler.get(session, isLoggedIn, async (req, res) => {
	const userId = req.user?.id;

	if (!userId) {
		return res.status(401).json([]);
	}

	const bookings = await prisma.booking.findMany({ where: { userId } });

	res.status(200).json(bookings);
});

handler.post(
	session,
	isLoggedIn,
	validate({ body: postBodySchema }),
	async (req, res) => {
		const seminarId = req.body.seminarId as string;
		const userId = req.user?.id;

		const seminar = await prisma.seminar.findUnique({
			where: {
				id: seminarId,
			},
			include: {
				_count: {
					select: { bookings: true },
				},
			},
		});

		if (!seminar) {
			return res.status(400).end();
		}

		const hasFreePlaces = seminar._count.bookings < seminar.maxBookings;

		if (!hasFreePlaces) {
			return res.status(400).end();
		}

		const existingBooking = await prisma.booking.findFirst({
			where: {
				seminar: { timeSlot: { id: seminar.timeSlotId } },
				user: { id: userId },
			},
		});

		if (existingBooking) {
			const updatedUser = await prisma.user.update({
				where: {
					id: userId,
				},
				data: {
					bookings: {
						update: {
							where: { id: existingBooking.id },
							data: {
								seminar: {
									connect: {
										id: seminarId,
									},
								},
							},
						},
					},
				},
				include: {
					bookings: true,
				},
			});

			res.status(201).json(updatedUser.bookings);
		} else {
			const updatedUser = await prisma.user.update({
				where: {
					id: userId,
				},
				data: {
					bookings: {
						create: {
							seminar: {
								connect: { id: seminarId },
							},
						},
					},
				},
				include: {
					bookings: true,
				},
			});

			res.status(201).json(updatedUser.bookings);
		}
	}
);

export default handler;
