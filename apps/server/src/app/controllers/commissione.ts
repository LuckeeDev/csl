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

    saveEvent(`Modificata la pagina della commissione ${id}`, {
      user: user.email,
      category: 'commissioni',
    });

    return {
      success: true,
    };
  } catch (err) {
    saveError(
      `Errore durante la modifica della pagina della commissione ${id}`,
      {
        user: user.email,
        category: 'commissioni',
        err,
      }
    );

    return {
      success: false,
    };
  }
};

export const createCommissione = async (
  commissione: ICommissione,
  user: IUser
) => {
  try {
    await new Commissione(commissione).save().then();

    saveEvent(`Created commissione "${commissione.id}"`, {
      user: user.email,
      category: 'commissioni',
    });

    return {
      success: true,
    };
  } catch (err) {
    saveError(`Error during the creation of commissione "${commissione.id}"`, {
      user: user.email,
      category: 'commissioni',
      err
    });
  }
};
