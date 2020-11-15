import mongoose, { Schema } from 'mongoose';
import { ICommissione, ICommissioneModel, IHttpRes, IUser } from '@csl/shared';
import { saveError, saveEvent } from '@config/winston';

const CommissioneSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    page: { type: Object },
    image: { type: String },
  },
  { skipVersioning: true }
);

export const Commissione = mongoose.model<ICommissioneModel>(
  'commissione',
  CommissioneSchema,
  'commissioni'
);

export const getCommissione = async (
  id: ICommissione['id']
): Promise<IHttpRes<ICommissione>> => {
  try {
    const commissione = await Commissione.findOne({ id });

    return {
      success: true,
      data: commissione,
    };
  } catch (err) {
    return {
      success: false,
      err,
    };
  }
};

export const setPage = async (
  id: ICommissione['id'],
  page: ICommissione['page'],
  user: IUser
): Promise<IHttpRes<any>> => {
  try {
    await Commissione.findOneAndUpdate({ id }, { page });

    saveEvent(`Pagina della commissione ${id} modificata`, {
      user: user.email,
      category: 'commissioni'
    });

    return {
      success: true,
    };
  } catch (err) {
    saveError(`Errore durante la modifica della pagina della commissione ${id}`, {
      user: user.email,
      category: 'commissioni',
      err,
    })

    return {
      success: false,
    };
  }
};
