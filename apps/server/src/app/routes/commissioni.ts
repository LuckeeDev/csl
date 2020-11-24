import { Router, Response } from 'express';
const router = Router();

import { authCheck, isReferente } from '@config/authcheck';
import { ICommissione, IRequest } from '@csl/shared';
import { getCommissione, setPage } from '@controllers/commissione';
import { bucket } from '@config/firebase';
import { UploadedFile } from 'express-fileupload';
import fse from 'fs-extra';
import { join } from 'path';
import { tmpdir } from 'os';

router.get('/:id', async (req: IRequest, res: Response) => {
  const params: any = req.params;
  const id: ICommissione['id'] = params.id;
  const result = await getCommissione(id);

  res.json(result);
})

router.patch('/:id', isReferente, async (req: IRequest, res: Response) => {
  const params: any = req.params;
  const id: ICommissione['id'] = params.id;
  const result = await setPage(id, req.body.page, req.user);

  res.json(result);
})

// Images
router.post('/image', isReferente, async (req: IRequest, res: Response) => {
  const files: any = req.files;
  const image: UploadedFile = files.image;
  const fileName = `${Date.now()}_${image.name}`;
  const workingDir = join(tmpdir(), 'commissioni');
  const tmpFilePath = join(workingDir, fileName);
  const firebasePath = `commissioni/images/${fileName}`;
  await fse.emptyDir(workingDir);

  await image.mv(tmpFilePath);

  await bucket.upload(tmpFilePath, {
    destination: firebasePath,
  });

  res.json({
    success: '1',
    file: {
      url: `/api/commissioni/image/${fileName}`,
      firebasePath,
    },
  });
});

router.get(
  '/image/:fileName',
  async (req: IRequest, res: Response) => {
    const firebasePath = `commissioni/images/${req.params.fileName}`;

    const workingDir = join(tmpdir(), 'commissioni');
    const tmpFilePath = join(workingDir, req.params.fileName);
    await fse.emptyDir(workingDir);

    await bucket.file(firebasePath).download({
      destination: tmpFilePath,
    });

    res.sendFile(tmpFilePath);
  }
);

export default router;
