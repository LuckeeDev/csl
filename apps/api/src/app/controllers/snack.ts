import mongoose, { Schema } from 'mongoose';
import { ISnack, ISnackModel } from '@csl/shared';

const SnackSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    maxQuantity: { type: Number, required: true },
  },
  { versionKey: false }
);

export const Snack = mongoose.model<ISnackModel>('snack', SnackSchema);

export const createSnack = (snack: ISnack) => {
  return new Snack(snack)
    .save()
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
};

export const deleteSnack = (id: ISnack['id']) => {
  return Snack.findOneAndDelete({ id })
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
};

export const updateMaxQuantity = async (
  maxQuantity: ISnack['maxQuantity'],
  id: ISnack['id']
) => {
  const result = await Snack.findOneAndUpdate({ id }, { maxQuantity })
    .then((res) => {
      return { success: true };
    })
    .catch((err) => {
      return { success: false, err };
    });

  return result;
};

export const getSnacks = async () => {
  const result = await Snack.find();

  return result;
};
