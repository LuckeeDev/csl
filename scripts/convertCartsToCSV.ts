import { parse } from 'json2csv';
const jsonFile = require('./data/json/users.json');
import { reduceCart, IUser } from '../libs/shared/src';
import * as fse from 'fs-extra';
import { join } from 'path';

type ImportantInfo = Pick<IUser, 'name' | 'cart' | 'classID' | 'phone'>;

const users: IUser[] = jsonFile;

const importantInfo = users
	.map(
		(user) =>
			({
				name: user.name,
				cart: user.cart,
				classID: user.classID,
				phone: user.phone,
			} as ImportantInfo)
	)
	.map((user) => {
		const { cart, ...userData } = user;
		const reducedCart = reduceCart(cart);
		return reducedCart.map(({ cartID, ...orderData }) => ({
			...orderData,
			...userData,
		}));
	})
	.reduce((acc: unknown[], val) => [...acc, ...val], []);

const csv = parse(importantInfo, { delimiter: ';', quote: '' });

fse
	.ensureFile(join(__dirname, 'data', 'csv', 'result.csv'))
	.then(() => fse.writeFile(join(__dirname, 'data', 'csv', 'result.csv'), csv))
	.then(() => console.log('Done!'))
	.catch(console.log);
