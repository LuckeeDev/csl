import mongoose, { Schema } from 'mongoose';
import { IBugData, IHttpRes, IReportModel, IUser } from '@csl/shared';
import { v4 } from 'uuid';

const ReportSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    user: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    classID: { type: String, required: true },
    date: { type: String, required: true },
    bug: { type: Object },
  },
  { skipVersioning: true }
);

export const Report = mongoose.model<IReportModel>('report', ReportSchema);

export const reportBug = async (
  user: IUser,
  bug: IBugData
): Promise<IHttpRes<any>> => {
  const today = new Date();

  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const date = `${day}-${month}-${year}`;

  return new Report({
    id: v4(),
    user: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    classID: user.classID,
    date,
    bug,
  })
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
