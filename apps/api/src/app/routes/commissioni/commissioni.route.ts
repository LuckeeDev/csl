import { Router, Response, Request } from 'express';
const router = Router();

import { isReferente } from '@common/auth';
import { ICommissione } from '@csl/shared';
import {
  getCommissione,
  setPage,
  addPDF,
  removePDF,
} from '@controllers';
import { bucket } from '@common/firebase';
import { UploadedFile } from 'express-fileupload';
import fse from 'fs-extra';
import { join } from 'path';
import { tmpdir } from 'os';

router.get('/:id', async (req: Request, res: Response) => {
  const params: any = req.params;
  const id: ICommissione['id'] = params.id;
  const result = await getCommissione(id);

  res.json(result);
});

router.patch('/:id', isReferente, async (req: Request, res: Response) => {
  const params: any = req.params;
  const id: ICommissione['id'] = params.id;
  const result = await setPage(id, req.body.page, req.user);

  res.json(result);
});

// PDFs
router.post('/:id/pdf', isReferente, async (req: Request, res: Response) => {
  const pdf: string = req.body.pdf;

  const params: any = req.params;
  const commissione: ICommissione['id'] = params.id;

  const result = await addPDF(pdf, commissione);

  res.json(result);
});

router.delete(
  '/:id/pdf/:file',
  isReferente,
  async (req: Request, res: Response) => {
    const params: any = req.params;

    const pdf: string = params.file;
    const commissione: ICommissione['id'] = params.id;

    const result = await removePDF(pdf, commissione);

    res.json(result);
  }
);

// Images
router.post('/:id/image', isReferente, async (req: Request, res: Response) => {
  const files: any = req.files;
  const image: UploadedFile = files.image;
  const fileName = `${Date.now()}_${image.name}`;
  const workingDir = join(tmpdir(), 'commissioni');
  const tmpFilePath = join(workingDir, fileName);
  const firebasePath = `commissioni/${req.params.id}/images/${fileName}`;
  await fse.emptyDir(workingDir);

  await image.mv(tmpFilePath);

  await bucket.upload(tmpFilePath, {
    destination: firebasePath,
  });

  res.json({
    success: '1',
    file: {
      url: `/api/commissioni/${req.params.id}/image/${fileName}`,
      firebasePath,
    },
  });
});

router.get('/:id/image/:fileName', async (req: Request, res: Response) => {
  const firebasePath = `commissioni/${req.params.id}/images/${req.params.fileName}`;

  const workingDir = join(tmpdir(), 'commissioni');
  const tmpFilePath = join(workingDir, req.params.fileName);
  await fse.emptyDir(workingDir);

  await bucket.file(firebasePath).download({
    destination: tmpFilePath,
  });

  res.sendFile(tmpFilePath);
});

export { router as commissioni };
