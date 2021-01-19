import { Schema, model } from 'mongoose';
import { IArticleModel } from '@csl/shared';

const ArticleSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: Object, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    estimatedTime: { type: Number },
    image: { type: String },
    published: { type: Boolean, default: false, required: true },
    date: { type: Date },
  },
  { skipVersioning: true }
);

export const Article = model<IArticleModel>('article', ArticleSchema);
