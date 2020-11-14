import mongoose, { Schema } from 'mongoose';
import { ICommissione, ICommissioneModel, IHttpRes, IUser } from '@csl/shared';

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

export const getCommissione = async (id: ICommissione['id']): Promise<IHttpRes<ICommissione>> => {
  try {
    const commissione = await Commissione.findOne({ id });
    
    return {
      success: true,
      data: commissione
    };
  } catch (err) {
    return {
      success: false,
      err
    };
  }
}

export const setPage = async (id: ICommissione['id'], page: ICommissione['page']): Promise<IHttpRes<any>> => {
  try {
    await Commissione.findOneAndUpdate({ id }, { page });

    return {
      success: true
    }
  } catch (err) {
    return {
      success: false,
      err
    }
  }
}
