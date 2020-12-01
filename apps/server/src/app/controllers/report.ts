import mongoose, { Schema } from 'mongoose';
import { IBugData, IHttpRes, IReport, IReportModel, IUser } from '@csl/shared';
import { v4 } from 'uuid';
import { saveError } from '@config/winston';

const ReportSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    user: { type: String },
    name: { type: String, required: true },
    classID: { type: String, required: true },
    date: { type: Date, required: true },
    solved: { type: Boolean, default: false },
    bug: { type: Object },
  },
  { skipVersioning: true }
);

export const Report = mongoose.model<IReportModel>('report', ReportSchema);

export const reportBug = async (
  user: IUser,
  bug: IBugData
): Promise<IHttpRes<any>> => {
  const date = new Date();

  return new Report({
    id: v4(),
    user: user.id,
    name: user.name,
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
      saveError('Error occurred while reporting a bug', {
        category: 'reports',
        err
      })

      return {
        success: false,
      };
    });
};

export const getReports = async (): Promise<IHttpRes<IReportModel[]>> => {
  return Report.find()
    .then((data) => {
      return {
        success: true,
        data,
      };
    })
    .catch((err) => {
      return {
        success: false,
        err,
      };
    });
};

export const toggleSolved = async (
  id: IReport['id'],
  solved: IReport['solved']
): Promise<IHttpRes<any>> => {
  try {
    await Report.findOneAndUpdate({ id }, { solved });

    return {
      success: true,
    };
  } catch (err) {
    saveError(`Error while toggling solved state on report ${id}`, {
      category: 'reports',
      err,
    });

    return {
      success: false,
    };
  }
};
