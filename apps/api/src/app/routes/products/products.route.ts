import { Router, Request, Response } from 'express';
const router = Router();
import { isRappre, isSignedIn } from '@common/auth';
import {
	getAllGadgets,
	createGadget,
	getAllPhotos,
	createPhoto,
	findProduct,
	deleteProduct,
	getAllProducts,
} from '@controllers';
import { IProduct } from '@csl/shared';
import Stripe from 'stripe';
import { environment } from '@environments/environment';
import { saveError } from '@/common/logs';

const stripe = new Stripe(environment.STRIPE_KEY, {
	apiVersion: '2020-08-27',
	typescript: true,
});

// Get all products
router.get('/', isSignedIn, async (req: Request, res: Response) => {
	const result = await getAllProducts();
	res.json(result);
});

// Get all gadgets
router.get('/gadgets', isSignedIn, async (req: Request, res: Response) => {
	const result = await getAllGadgets();
	res.json(result);
});

// Create a new gadget
router.post(
	'/create-gadgets',
	isRappre,
	async (req: Request<IProduct>, res: Response) => {
		try {
			const { price: rawPrice } = req.body;
			const stripeProductName = `Donazione di ${rawPrice}€`;

			const product = await stripe.products.create({
				name: stripeProductName,
			});

			const price = rawPrice * 100;

			const stripeProductID = product.id;

			const stripePrice = await stripe.prices.create({
				product: stripeProductID,
				unit_amount: price,
				currency: 'eur',
			});

			const stripePriceID = stripePrice.id;

			const result = await createGadget(
				{ ...req.body, price },
				stripeProductID,
				stripePriceID
			);

			res.json(result);
		} catch (err) {
			saveError(`Error while creating Stripe product: "${req.body.name}"`, {
				category: 'products',
				err,
			});

			res.json({
				success: false,
				err,
			});
		}
	}
);

// Get all photo products
router.get('/photos', isSignedIn, async (req: Request, res: Response) => {
	const result = await getAllPhotos();
	res.json(result);
});

// Create a new photo product
router.post(
	'/create-photos',
	isRappre,
	async (req: Request<IProduct>, res: Response) => {
		const result = await createPhoto(req.body);
		res.json(result);
	}
);

// Find a product via its ID
router.post('/find', isSignedIn, async (req: Request, res: Response) => {
	const result = await findProduct(req.body.id);
	res.json(result);
});

// Delete a product
router.delete('/:id', isRappre, async (req: Request, res: Response) => {
	const id = req.params.id;
	const result = await deleteProduct(id);

	res.json(result);
});

export { router as products };
