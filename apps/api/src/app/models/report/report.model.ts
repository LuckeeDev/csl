import { model, Schema } from 'mongoose';
import { IReportModel } from '@csl/shared';

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

export const Report = model<IReportModel>('report', ReportSchema);
