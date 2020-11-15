import mongoose, { Schema } from 'mongoose';
import { bucket } from '@config/firebase';
import { join } from 'path';
import { tmpdir } from 'os';
import fse from 'fs-extra';
import sharp from 'sharp';
import { IProduct, IProductModel } from '@csl/shared';

const ProductSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    fileNames: { type: Array, required: true },
    colors: { type: Array },
    sizes: { type: Array },
  },
  { versionKey: false }
);

export const Product = mongoose.model<IProductModel>('product', ProductSchema, 'gadgets');

// Get all gadgets in the database
export const getAllGadgets = async () => {
  const res = await Product.find({ category: 'gadgets' });

  return res;
};

// Create a new gadget
export const createGadget = async (product: IProduct) => {
  let { id, name, description, price, fileNames, colors, sizes } = product;
  let category = 'gadgets';

  const workingDir = join(tmpdir(), 'images');
  fse.ensureDir(workingDir);

  const uploadPromises = fileNames.map(async (tmpFileName: any) => {
    let tmpFilePath = join(workingDir, tmpFileName);
    let pngFileName = tmpFileName.split('.').shift() + '.png';
    let pngFilePath = join(workingDir, pngFileName);
    let newFileName = `500@${pngFileName}`;
    let newFilePath = join(workingDir, newFileName);

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

  fileNames = fileNames.map((fileName: any) => {
    return `500@${fileName.split('.').shift()}.png`;
  });

  return new Product({
    id,
    name,
    description,
    category,
    price,
    fileNames,
    colors,
    sizes,
  })
    .save()
    .then((res: any) => {
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
  let { id, name, description, price, fileNames } = product;
  let category = 'photos';

  const workingDir = join(tmpdir(), 'images');
  fse.ensureDir(workingDir);

  const uploadPromises = fileNames.map(async (tmpFileName: any) => {
    let tmpFilePath = join(workingDir, tmpFileName);
    let pngFileName = tmpFileName.split('.').shift() + '.png';
    let pngFilePath = join(workingDir, pngFileName);
    let newFileName = `500@${pngFileName}`;
    let newFilePath = join(workingDir, newFileName);

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

  fileNames = fileNames.map((fileName: any) => {
    return `500@${fileName.split('.').shift()}.png`;
  });

  return new Product({
    id,
    name,
    description,
    category,
    price,
    fileNames,
  })
    .save()
    .then((res: any) => {
      return { success: true };
    })
    .catch((err: any) => {
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
    .then((res) => {
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
