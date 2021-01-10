import { Response, Router } from 'express';
import { IEvent, IRequest } from '@csl/shared';
import { getEvent, createEvent, deleteEvent } from '@controllers/orientamento';
import { authCheck, isRappre } from '@config/authcheck';
const router = Router();

router.get(['/', '/:id'], authCheck, async (req: IRequest, res: Response) => {
  const result = await getEvent(req.params.id);

  res.json(result);
});

router.post('/', isRappre, async (req: IRequest<{ event: IEvent }>, res: Response) => {
  const result = await createEvent(req.body.event);

  res.json(result);
});

router.delete('/:id', isRappre, async (req: IRequest, res: Response) => {
  const result = await deleteEvent(req.params.id);

  res.json(result);
});

export default router;
