import { isSignedIn } from '@/common/auth';
import { Request, Response, Router } from 'express';
import { ProductInUserCart } from '@csl/shared';
import { addToCart } from '@/controllers';
import { fireAuth } from '@/common/firebase';
const router = Router();

router.get('/', async (req: Request, res: Response) => {
	const getFirebaseToken = req.query.firebase === 'true' ? true : false;
	const user = req.user;

	if (user && getFirebaseToken) {
		const token = await fireAuth.createCustomToken(user.id, {
			isAdmin: user.isAdmin,
			isBar: user.isBar,
			isQp: user.isQp,
			isRappre: user.isRappre,
			isRappreDiClasse: user.isRappreDiClasse,
			isReferente: user.isReferente,
			isVice: user.isVice,
		});

		res.json({
			success: true,
			data: {
				user,
				token,
			},
		});
	} else if (user) {
		res.json({
			success: true,
			data: {
				user,
			},
		});
	} else {
		res.json({
			success: false,
		});
	}
});

router.patch(
	'/cart',
	isSignedIn,
	async (req: Request<ProductInUserCart>, res) => {
		const product = req.body;
		const user = req.user;

		const result = await addToCart(product, user);

		res.json(result);
	}
);

export { router as me };
