import { Request, Response, Router } from 'express';
const router = Router();
import { isQp, authCheck } from '@config/authcheck';
import {
  saveArticle,
  getArticle,
  getArticles,
  deleteArticle,
} from '@controllers/article';
import fse from 'fs-extra';
import { tmpdir } from 'os';
import { join } from 'path';
import { UploadedFile } from 'express-fileupload';
import { bucket } from '@config/firebase';

// Images
router.post('/image', isQp, async (req: Request, res: Response) => {
  const files: any = req.files;
  const image: UploadedFile = files.image;
  const fileName = `${Date.now()}_${image.name}`;
  const workingDir = join(tmpdir(), 'qp');
  const tmpFilePath = join(workingDir, fileName);
  const firebasePath = `articles/images/${fileName}`;
  await fse.emptyDir(workingDir);

  await image.mv(tmpFilePath);

  await bucket.upload(tmpFilePath, {
    destination: firebasePath,
  });

  res.json({
    success: '1',
    file: {
      url: `/api/articles/image/${fileName}`,
      firebasePath,
    },
  });
});

router.get(
  '/image/:fileName',
  authCheck,
  async (req: Request, res: Response) => {
    const firebasePath = `articles/images/${req.params.fileName}`;

    const workingDir = join(tmpdir(), 'qp');
    const tmpFilePath = join(workingDir, req.params.fileName);
    await fse.emptyDir(workingDir);

    await bucket.file(firebasePath).download({
      destination: tmpFilePath,
    });

    res.sendFile(tmpFilePath);
  }
);

// Article operations
router.get('/', authCheck, async (req: Request, res: Response) => {
  const articles = await getArticles();
  res.json(articles);
});

router.get('/:id', authCheck, async (req: Request, res: Response) => {
  const article = await getArticle(req.params.id);
  res.json(article);
});

router.post('/:id', isQp, async (req: Request, res: Response) => {
  const result = await saveArticle(req.body.article, req.params.id);
  res.json(result);
});

router.delete('/:id', isQp, async (req: Request, res: Response) => {
  const result = await deleteArticle(req.params.id);
  res.json(result);
});

export default router;
