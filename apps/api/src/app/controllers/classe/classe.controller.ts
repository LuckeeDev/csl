import { saveError } from '@/common/logs';
import { IClass, IUser, IProduct, IHttpRes } from '@csl/shared';
import { Class, Order } from '@models';

// Get all classes in the database
export const getClasses = async (): Promise<IClass[]> => {
	const res = await Class.find();

	return res;
};

// Update the gadget total
export const updateTotal = async (
	orderTotal: number,
	classTotal: number,
	category: IProduct['category'],
	id: IClass['id']
) => {
	const totalToUpdate = category === 'gadgets' ? 'gadgetTotal' : 'photoTotal';

	return Class.findOneAndUpdate(
		{ id },
		{ [totalToUpdate]: classTotal + orderTotal }
	)
		.then(() => {
			return {
				success: true,
				msg: 'Order confirmed',
			};
		})
		.catch((err: any) => {
			return {
				success: false,
				err,
			};
		});
};

// Get total of a specific class in a specific category
export const getTotal = async (
	classID: IUser['classID'],
	category: IProduct['category']
) => {
	const categoryTotal = category === 'gadgets' ? 'gadgetTotal' : 'photoTotal';

	return Class.findOne({ id: classID }).then((res: any) => {
		return res[categoryTotal];
	});
};

// Set category total as paid
export const setPaid = async (
	classID: IClass['id'],
	category: IProduct['category']
): Promise<IHttpRes<void>> => {
	try {
		const updateQuery = `paid.${category}`;

		await Class.findOneAndUpdate(
			{ id: classID },
			{ [updateQuery]: true },
			{ upsert: true }
		);

		return {
			success: true,
		};
	} catch (err) {
		saveError(`Error while marking order as paid`, {
			category: 'payments',
			err,
		});

		return {
			success: false,
			err,
		};
	}
};

// Verify that all class members have confirmed their order
export const verifyReady = async (
	classID: IClass['id'],
	category: IProduct['category']
) => {
	const confirmedCategory =
		category === 'gadgets' ? 'gadgetsConfirmed' : 'photosConfirmed';

	return await Order.find({ classID }).then((res: any) => {
		const isNotConfirmed = res.find(
			(obj: any) => obj[confirmedCategory] === false
		);

		return !isNotConfirmed;
	});
};

// Verify that the class hasn't already paid
export const verifyPaid = async (
	id: IClass['id'],
	category: IProduct['category']
) => {
	const paidCategory = category === 'gadgets' ? 'gadgetPaid' : 'photoPaid';

	return await Class.findOne({ id }).then((res: any) => {
		return res[paidCategory];
	});
};

export const updateSnackCreditInClass = async (
	email: IUser['email'],
	snackCredit: IUser['snackCredit'],
	classID: IUser['classID']
) => {
	await Class.findOne({ id: classID }).then(async (classe) => {
		const member = classe.members.find((x) => x.email === email);

		await Class.updateOne(
			{ id: classID, members: member },
			{
				$set: {
					'members.$': {
						email,
						snackCredit,
					},
				},
			}
		).then();
	});
};
