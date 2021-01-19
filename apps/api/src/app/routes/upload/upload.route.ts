import express from 'express';
const router = express.Router();
import { join } from 'path';
import { tmpdir } from 'os';
import { uploadCSV } from '@config/csvupload';
import { isVice } from '@common/auth';
import { bucket } from '@config/firebase';
import fse from 'fs-extra';
import { UploadedFile } from 'express-fileupload';

// Upload CSV file
router.post('/csv', isVice, async (req, res) => {
  if (!req.files) {
    res.json({ uploadError: true });
  } else {
    const files: any = req.files;
    const csv: UploadedFile = files.viceCsv;
    const fileName = `${Date.now()}_${csv.name}`;
    const workingDir = join(tmpdir(), 'csv');
    const tmpFilePath = join(workingDir, fileName);

    fse.ensureDir(workingDir);

    await csv.mv(tmpFilePath);

    const csvResult = await uploadCSV(tmpFilePath).then((result) => {
      return result;
    });

    await bucket.upload(tmpFilePath, {
      destination: `csv/${fileName}`,
    });

    fse.remove(workingDir);

    res.json(csvResult);
  }
});

export { router as upload };
