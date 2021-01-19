import { bucket } from '@common/firebase';
import { join } from 'path';
import { tmpdir } from 'os';
import fse from 'fs-extra';
import sharp from 'sharp';
import { IProduct } from '@csl/shared';
import { Product } from '@models';

// Get all gadgets in the database
export const getAllGadgets = async () => {
  const res = await Product.find({ category: 'gadgets' });

  return res;
};

// Create a new gadget
export const createGadget = async (product: IProduct) => {
  const { id, name, description, price, fileNames, colors, sizes } = product;
  const category = 'gadgets';

  const workingDir = join(tmpdir(), 'images');
  fse.ensureDir(workingDir);

  const uploadPromises = fileNames.map(async (tmpFileName: any) => {
    const tmpFilePath = join(workingDir, tmpFileName);
    const pngFileName = tmpFileName.split('.').shift() + '.png';
    const pngFilePath = join(workingDir, pngFileName);
    const newFileName = `500@${pngFileName}`;
    const newFilePath = join(workingDir, newFileName);

    await bucket.file(`gadgetImages/raw/${tmpFileName}`).download({
      destination: tmpFilePath,
    });

    await sharp(tmpFilePath).toFormat('png').toFile(pngFilePath);

    await sharp(pngFilePath)
      .resize({
        width: 500,
        height: 500,
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toFile(newFilePath);

    return bucket.upload(newFilePath, {
      destination: `gadgetImages/${id}/${newFileName}`,
    });
  });

  await Promise.all(uploadPromises);

  fse.remove(workingDir);

  const newFileNames = fileNames.map((fileName: any) => {
    return `500@${fileName.split('.').shift()}.png`;
  });

  return new Product({
    id,
    name,
    description,
    category,
    price,
    fileNames: newFileNames,
    colors,
    sizes,
  })
    .save()
    .then(() => {
      return { success: true };
    })
    .catch((err: any) => {
      return { err };
    });
};

// Get all photo products in the database
export const getAllPhotos = async () => {
  const res = await Product.find({ category: 'photos' });

  return res;
};

// Create a new photo product
export const createPhoto = async (product: IProduct) => {
  const { id, name, description, price, fileNames } = product;
  const category = 'photos';

  const workingDir = join(tmpdir(), 'images');
  fse.ensureDir(workingDir);

  const uploadPromises = fileNames.map(async (tmpFileName: any) => {
    const tmpFilePath = join(workingDir, tmpFileName);
    const pngFileName = tmpFileName.split('.').shift() + '.png';
    const pngFilePath = join(workingDir, pngFileName);
    const newFileName = `500@${pngFileName}`;
    const newFilePath = join(workingDir, newFileName);

    await bucket.file(`photoImages/raw/${tmpFileName}`).download({
      destination: tmpFilePath,
    });

    await sharp(tmpFilePath).toFormat('png').toFile(pngFilePath);

    await sharp(pngFilePath)
      .resize({
        width: 500,
        height: 500,
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toFile(newFilePath);

    return bucket.upload(newFilePath, {
      destination: `photoImages/${id}/${newFileName}`,
    });
  });

  await Promise.all(uploadPromises);

  fse.remove(workingDir);

  const newFileNames = fileNames.map((fileName: any) => {
    return `500@${fileName.split('.').shift()}.png`;
  });

  return new Product({
    id,
    name,
    description,
    category,
    price,
    fileNames: newFileNames,
  })
    .save()
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      return { err };
    });
};

// Get product based on product ID
export const findProduct = async (id: IProduct['id']) => {
  const res = await Product.findOne({ id });

  return res;
};

// Delete product based on product ID
export const deleteProduct = async (id: IProduct['id']) => {
  const result = await Product.findOneAndDelete({ id })
    .then(() => {
      return {
        success: true,
      };
    })
    .catch((err) => {
      return {
        success: false,
        err,
      };
    });

  return result;
};
