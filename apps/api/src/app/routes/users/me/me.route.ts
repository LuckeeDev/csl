import { isSignedIn } from '@/common/auth';
import { Request, Response, Router } from 'express';
import { IProduct, IUser, ProductInUserCart } from '@csl/shared';
import { addToCart, confirmCategory, pullFromCart } from '@/controllers';
import { fireAuth } from '@/common/firebase';
import { Platform } from '@/models';
const router = Router();

router.get('/', async (req: Request, res: Response) => {
	const getFirebaseToken = req.query.firebase === 'true' ? true : false;
	const getPlatformStatus = req.query.status === 'true' ? true : false;

	const user = req.user;

	const data = {
		user: user ? user : null,
		token:
			user && getFirebaseToken
				? await fireAuth.createCustomToken(user.id, {
						isAdmin: user.isAdmin,
						isBar: user.isBar,
						isQp: user.isQp,
						isRappre: user.isRappre,
						isRappreDiClasse: user.isRappreDiClasse,
						isReferente: user.isReferente,
						isVice: user.isVice,
				  })
				: null,
		platformStatus: user && getPlatformStatus ? await Platform.find() : null,
	};

	res.json({
		success: user ? true : false,
		data,
	});
});

router.patch(
	'/cart',
	isSignedIn,
	async (req: Request<ProductInUserCart>, res: Response) => {
		const product = req.body;
		const user = req.user;

		if (product.bundled && product.bundled.quantity > product.quantity) {
			return res.json({
				success: false,
			});
		}

		const result = await addToCart(product, user);

		res.json(result);
	}
);

router.delete(
	'/cart/:cartID',
	isSignedIn,
	async (req: Request, res: Response) => {
		const cartID = (req.params
			.cartID as unknown) as ProductInUserCart['cartID'];
		const user = req.user;

		const result = await pullFromCart(cartID, user);

		res.json(result);
	}
);

router.patch(
	'/confirm',
	async (
		req: Request<{ category: IProduct['category']; phone: IUser['phone'] }>,
		res: Response
	) => {
		const { category, phone } = req.body;

		/**
		 * Add the phone param to the signed in user object.
		 */
		const user = req.user;

		const result = await confirmCategory(category, user, phone);

		res.json(result);
	}
);

export { router as me };
