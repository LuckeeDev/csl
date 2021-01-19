import { Request, Response, Router } from 'express';
import { messaging } from '@common/firebase';
import { saveError } from '@common/logs';
const router = Router();

router.post(
  '/topics/global',
  async (req: Request<{ token: string }>, res: Response) => {
    try {
      await messaging.subscribeToTopic(req.body.token, 'global');

      res.json({
        success: true,
      });
    } catch (err) {
      saveError('Error while subscribing user to "global" topic', {
        err,
        category: 'firebase',
      });

      res.json({
        success: false,
        err,
      });
    }
  }
);

export { router as fire };
