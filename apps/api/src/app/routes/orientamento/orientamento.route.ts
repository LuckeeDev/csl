import { Request, Response, Router } from 'express';
import { IEvent } from '@csl/shared';
import { getEvent, createEvent, deleteEvent } from '@controllers';
import { isSignedIn, isRappre } from '@common/auth';
const router = Router();

router.get(['/', '/:id'], isSignedIn, async (req: Request, res: Response) => {
  const result = await getEvent(req.params.id);

  res.json(result);
});

router.post('/', isRappre, async (req: Request<{ event: IEvent }>, res: Response) => {
  const result = await createEvent(req.body.event);

  res.json(result);
});

router.delete('/:id', isRappre, async (req: Request, res: Response) => {
  const result = await deleteEvent(req.params.id);

  res.json(result);
});

export { router as orientamento };
