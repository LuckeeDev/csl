import { Response, Router } from 'express';
import { messaging } from '@config/firebase';
import { IRequest } from '@csl/shared';
import { saveError } from '@config/winston';
const router = Router();

router.post(
  '/topics/global',
  async (req: IRequest, res: Response) => {
    try {
      await messaging.subscribeToTopic(req.body.token, 'global');

      res.json({
        success: true,
      });
    } catch (err) {
      saveError('Error while subscribing user to "global" topic', {
        err,
        category: 'firebase'
      });

      res.json({
        success: false,
        err
      });
    }
});

export default router;
