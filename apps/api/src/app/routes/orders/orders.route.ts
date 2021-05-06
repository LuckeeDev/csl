// Main imports
import { Request, Response, Router } from 'express';
const router = Router();
import { isRappreDiClasse, isSignedIn } from '@common/auth';
import {
	getAllOrders,
	confirmOrder,
	deleteFromCart,
	updateTotal,
	getTotal,
} from '@controllers';
import { IProduct } from '@csl/shared';

// Get all orders of a user
router.get('/', isSignedIn, async (req: Request, res: Response) => {
	const response = await getAllOrders(req.user.id);

	res.json(response);
});

// Confirm an order
router.post('/confirm', isSignedIn, async (req: Request, res: Response) => {
	const orderTotal = await confirmOrder(req.user.id, req.body.category);

	const classTotal = await getTotal(req.user.classID, req.body.category);

	const result = await updateTotal(
		orderTotal,
		classTotal,
		req.body.category,
		req.user.classID
	);

	res.json(result);
});

// Delete an order
router.post('/delete', isSignedIn, async (req: Request, res: Response) => {
	const result = await deleteFromCart(req.user.id, req.body.product);

	res.json(result);
});

router.post(
	'/setup-payment',
	isRappreDiClasse,
	async (req: Request<{ category: IProduct['category'] }>, res) => {
		res.json({
			success: false,
			notConfirmed: [
				"I pagamenti sono stati disattivati. Fai riferimento ai Rappresentanti d'istituto per continuare.",
			],
		});

		// const user = req.user;
		// const category = req.body.category;

		// const { ready, notConfirmed, err, products, paid } = await checkClassStatus(
		// 	user,
		// 	category
		// );

		// if (err) {
		// 	res.json({
		// 		success: false,
		// 		err,
		// 	});
		// } else if (ready === false && paid === true) {
		// 	res.json({
		// 		success: true,
		// 		data: { ready: false, paid },
		// 	});
		// } else if (ready === false) {
		// 	res.json({
		// 		success: true,
		// 		data: { ready: false, notConfirmed },
		// 	});
		// } else if (ready === true) {
		// 	const session = await stripe.checkout.sessions.create({
		// 		payment_method_types: ['card'],
		// 		line_items: products,
		// 		mode: 'payment',
		// 		success_url: `${environment.client}/store/payments/success`,
		// 		cancel_url: `${environment.client}/store/payments/error`,
		// 		customer_email: user.email,
		// 		metadata: {
		// 			classID: user.classID,
		// 			category: category,
		// 		},
		// 	});

		// 	res.json({
		// 		success: true,
		// 		data: { ready: true, id: session.id, total: session.amount_total },
		// 	});
		// }
	}
);

export { router as orders };
