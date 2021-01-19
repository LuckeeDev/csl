import { Request, Response, Router } from 'express';
const router = Router();
import { isQp, isSignedIn } from '@common/auth';
import {
  saveArticle,
  getArticle,
  getArticles,
  deleteArticle,
  changeArticlePublished,
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
  isSignedIn,
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
router.get('/', isSignedIn, async (req: Request, res: Response) => {
  const articles = await getArticles();
  res.json(articles);
});

router.get('/:id', isSignedIn, async (req: Request, res: Response) => {
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

router.patch('/:id/state', isQp, async (req: Request, res: Response) => {
  const result = await changeArticlePublished(
    req.params.id,
    req.body.state,
    req.user
  );
  res.json(result);
});

export { router as articles };
