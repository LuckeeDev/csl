import {
	TRole,
	IUser,
	IHttpRes,
	IAccount,
	ProductInUserCart,
	IProduct,
} from '@csl/shared';
import { Class, Product, User } from '@models';
import { updateSnackCreditInClass } from '../classe/classe.controller';
import { saveError, saveEvent } from '@common/logs';
import { stripe } from '@/common/stripe';

// Create an account (for admin)
export const createAccount = async (
	account: IAccount,
	user: IUser
): Promise<IHttpRes<any>> => {
	try {
		await User.findOne({ email: account.email }).then((user) => {
			if (!user) {
				return new User(account).save().then();
			}
		});

		await Class.findOne({ id: account.classID }).then((classe) => {
			if (classe) {
				return classe
					.updateOne({
						$push: {
							members: { email: account.email, snackCredit: 0, roles: [] },
						},
					})
					.then();
			} else {
				new Class({
					id: account.classID,
					members: [{ email: account.email, snackCredit: 0, roles: [] }],
					membersCount: 1,
				})
					.save()
					.then();
			}
		});

		saveEvent(`Manually created an account for ${account.name}`, {
			category: 'accounts',
			user: user.email,
		});

		return {
			success: true,
		};
	} catch (err) {
		saveError(
			`Error during the manual creation of an account for ${account.name}`,
			{
				category: 'accounts',
				user: user.email,
				err,
			}
		);
	}
};

// Remove an account (for admin)
export const removeAccount = async (
	email: IUser['email']
): Promise<IHttpRes<any>> => {
	const user = await User.findOneAndDelete({ email }).then();

	const classe = await Class.findOne({ id: user.classID });

	const elementToPull = classe.members.find((x) => x.email === email);

	return Class.findOneAndUpdate(
		{ id: user.classID },
		{
			$pull: {
				members: elementToPull,
			},
			$inc: {
				membersCount: -1,
			},
		}
	)
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

// Add a role to a user
export const addRole = async (email: IUser['email'], role: TRole) => {
	let updateQuery: { [key: string]: boolean | string };

	if (role.includes('isReferente')) {
		const regExp = /\[([^)]+)\]/;
		const commissione = regExp.exec(role)[1];

		updateQuery = { isReferente: commissione };
	} else {
		updateQuery = { [role]: true };
	}

	try {
		const classID = await User.findOneAndUpdate({ email }, updateQuery).then(
			(user) => user.classID
		);

		return Class.findOne({ id: classID }).then(async (classe) => {
			const member = classe.members.find((x) => x.email === email);

			member.roles.push(role);

			try {
				await Class.findOneAndUpdate(
					{ id: classID, members: { $elemMatch: { email } } },
					{ 'members.$': member }
				);

				return {
					success: true,
				};
			} catch (err) {
				return {
					success: false,
					err,
				};
			}
		});
	} catch (err) {
		return {
			success: false,
			err,
		};
	}
};

// Remove a role from a user
export const removeRole = async (email: IUser['email'], role: TRole) => {
	let updateClassQuery: any;

	if (role.includes('isReferente')) {
		const regExp = /\[([^)]+)\]/;
		const commissione = regExp.exec(role)[1];

		updateClassQuery = { isReferente: commissione };
	} else {
		updateClassQuery = { [role]: true };
	}

	const classID = await User.findOneAndUpdate(
		{ email: email },
		{ $unset: updateClassQuery }
	).then((user) => {
		return user.classID;
	});

	return Class.findOne({ id: classID }).then((classe) => {
		const member = classe.members.find((x) => x.email === email);

		const i = member.roles.findIndex((x) => x === role);

		member.roles.splice(i, 1);

		return Class.findOneAndUpdate(
			{ id: classID, members: { $elemMatch: { email } } },
			{ 'members.$': member }
		)
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
	});
};

// Get roles of a user
export const getRoles = (email: IUser['email']) => {
	return User.findOne({ email: email }).then((user: any) => {
		const roles = [];
		if (user.isVice) {
			roles.push('isVice');
		}
		if (user.isRappre) {
			roles.push('isRappre');
		}
		if (user.isRappreDiClasse) {
			roles.push('isRappreDiClasse');
		}
		if (user.isQp) {
			roles.push('isQp');
		}
		return roles;
	});
};

export const addToCart = async (
	product: ProductInUserCart,
	user: IUser
): Promise<IHttpRes<void>> => {
	try {
		await User.findOneAndUpdate({ id: user.id }, { $push: { cart: product } });

		return {
			success: true,
		};
	} catch (err) {
		saveError('Error while adding to cart', {
			category: 'orders',
			err,
		});

		return {
			success: false,
			err,
		};
	}
};

export const confirmCategory = async (
	category: IProduct['category'],
	user: IUser,
	phone: IUser['phone']
): Promise<IHttpRes<void>> => {
	try {
		const updateQuery = `confirmed.${category}`;

		/**
		 * Update the user phone.
		 */
		await User.findOneAndUpdate(
			{ id: user.id },
			{ [updateQuery]: true, phone },
			{ upsert: true }
		);

		return {
			success: true,
		};
	} catch (err) {
		saveError(
			`Errore durante la conferma dell'ordine per l'utente ${user.name}`,
			{
				err,
				category: 'orders',
			}
		);

		return {
			success: false,
			err,
		};
	}
};

export const checkClassStatus = async (
	user: IUser,
	category: IProduct['category']
): Promise<{
	ready: boolean;
	notConfirmed?: IUser[];
	err?: Error;
	products?: {
		quantity: ProductInUserCart['quantity'];
		price: IProduct['stripePriceID'];
	}[];
}> => {
	try {
		const classUsers = await User.find({
			classID: user.classID,
		});

		const usersWhoHaveNotConfirmed = classUsers.filter(
			(user) => !(user.confirmed && user.confirmed[category] === true)
		);

		const errorsCount = usersWhoHaveNotConfirmed.length;

		if (errorsCount === 0) {
			const availableProducts = await Product.find();

			const products = classUsers
				.map((user) => user.cart.map(({ id, quantity }) => ({ id, quantity })))
				.reduce((acc, current) => [...acc, ...current], [])
				.reduce((acc: { id: string; quantity: number }[], current) => {
					const index = acc.findIndex((val) => val.id === current.id);

					if (index === -1) {
						acc.push(current);
					} else {
						const currentValue = acc[index];
						acc[index] = {
							id: currentValue.id,
							quantity: currentValue.quantity + current.quantity,
						};
					}

					return acc;
				}, [])
				.map(({ quantity, id }) => {
					const price = availableProducts.find((x) => x.id === id).stripePriceID;

					return {
						quantity,
						price,
					};
				});

			return {
				ready: true,
				products,
			};
		} else {
			return {
				ready: false,
				notConfirmed: usersWhoHaveNotConfirmed,
			};
		}
	} catch (err) {
		saveError('Error while creating a payment', {
			err,
			category: 'payments',
		});

		console.log(err);

		return {
			ready: false,
			err,
		};
	}
};

// Get the stripe customer ID of a user
export const getStripeID = async (
	id: IUser['id']
): Promise<string | undefined> => {
	const stripeID = await User.findOne({ id }).then((user) => {
		if (user && user.isRappreDiClasse && user.stripeID) {
			return user.stripeID;
		} else if (user) {
			return stripe.customers
				.create({
					name: `${user.name}`,
					email: `${user.email}`,
					description: `Rappresentante della ${user.classID}`,
				})
				.then(async (customer) => {
					const newID = await User.findOneAndUpdate(
						{ id },
						{ stripeID: customer.id }
					).then(() => customer.id);

					return newID;
				});
		}
	});

	return stripeID;
};

// Update credit (for bar)
export const updateCredit = async (
	email: IUser['email'],
	money: IUser['snackCredit']
) => {
	const result = await User.findOne({ email })
		.then(async (user) => {
			const snackCredit = money + user.snackCredit;
			const classID = user.classID;

			await updateSnackCreditInClass(email, snackCredit, classID);

			return await User.findOneAndUpdate({ email }, { snackCredit })
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
		})
		.catch((err) => {
			return {
				success: false,
				err,
			};
		});

	return result;
};
