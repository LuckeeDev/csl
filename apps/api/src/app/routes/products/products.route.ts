import { Router, Request, Response } from 'express';
const router = Router();
import { isRappre, isSignedIn } from '@common/auth';
import {
  getAllGadgets,
  createGadget,
  getAllPhotos,
  createPhoto,
  findProduct,
  deleteProduct
} from '@controllers/product';
import { IProduct } from '@csl/shared';

// Get all gadgets
router.get('/gadgets', isSignedIn, async (req: Request, res: Response) => {
  const result = await getAllGadgets();
  res.json(result);
});

// Create a new gadget
router.post('/create-gadgets', isRappre, async (req: Request<IProduct>, res: Response) => {
  const result = await createGadget(req.body);
  res.json(result);
});

// Get all photo products
router.get('/photos', isSignedIn, async (req: Request, res: Response) => {
  const result = await getAllPhotos();
  res.json(result);
});

// Create a new photo product
router.post('/create-photos', isRappre, async (req: Request<IProduct>, res: Response) => {
  const result = await createPhoto(req.body);
  res.json(result);
});

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
