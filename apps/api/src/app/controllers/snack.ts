import { ISnack } from '@csl/shared';
import { Snack } from '@models';

export const createSnack = (snack: ISnack) => {
  return new Snack(snack)
    .save()
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
};

export const deleteSnack = (id: ISnack['id']) => {
  return Snack.findOneAndDelete({ id })
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
};

export const updateMaxQuantity = async (
  maxQuantity: ISnack['maxQuantity'],
  id: ISnack['id']
) => {
  const result = await Snack.findOneAndUpdate({ id }, { maxQuantity })
    .then(() => {
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
