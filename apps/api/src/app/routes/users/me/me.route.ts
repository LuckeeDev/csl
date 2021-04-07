import { isSignedIn } from '@/common/auth';
import { Request, Router } from 'express';
import { ProductInUserCart } from '@csl/shared';
import { addToCart } from '@/controllers';
const router = Router();

router.get('/', isSignedIn, async (req, res) => {
	res.json({
		success: true,
		data: req.user,
	});
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
