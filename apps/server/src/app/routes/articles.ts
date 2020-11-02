import { Request, Response, Router } from 'express';
const router = Router();
import { isQp, authCheck } from '../config/authcheck';
import {
  saveArticle,
  findArticle,
  getArticles,
  deleteArticle,
} from '../models/article';
import fse from 'fs-extra';
import { tmpdir } from 'os';
import { join } from 'path';
import { UploadedFile } from 'express-fileupload';
import { bucket } from '../config/firebase';

// Find a specific article via its ID
router.get('/find/:id', authCheck, async (req: Request, res: Response) => {
  const article = await findArticle(req.params.id);
  res.json(article);
});

// Retrieve all articles from the database
router.get('/', authCheck, async (req: Request, res: Response) => {
  const articles = await getArticles();
  res.json(articles);
});

// Upload an image to Firebase and return URL
router.post('/image', isQp, async (req: Request, res: Response) => {
  const files: any = req.files;
  const image: UploadedFile = files.image;
  const fileName = `${Date.now()}_${image.name}`;
  const workingDir = join(tmpdir(), 'qp');
  const tmpFilePath = join(workingDir, fileName);
  const firebasePath = `articles/images/${fileName}`;

  fse.ensureDir(workingDir);

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

// Save an article
router.post('/:id', isQp, async (req: Request, res: Response) => {
  const result = await saveArticle(req.body.article, req.params.id);
  res.json(result);
});

// Retrieve image saved on the fs
router.get(
  '/image/:fileName',
  authCheck,
  async (req: Request, res: Response) => {
    res.sendFile(join(tmpdir(), 'qp', req.params.fileName));
  }
);

// Delete an article
router.delete('/:id', isQp, async (req: Request, res: Response) => {
  const result = await deleteArticle(req.params.id);
  res.json(result);
});

export default router;
