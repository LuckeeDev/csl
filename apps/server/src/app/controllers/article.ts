import mongoose, { Schema } from 'mongoose';
import { IArticleModel, IArticle } from '@csl/shared';

const ArticleSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: Object, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    estimatedTime: { type: Number },
    image: { type: String },
  },
  { skipVersioning: true }
);

export const Article = mongoose.model<IArticleModel>('article', ArticleSchema);

// Save a new article
export const saveArticle = async (article: IArticle, id: IArticle['id']) => {
  const exists = (await Article.findOne({ id })) ? true : false;

  const { title, category, author, estimatedTime, content, image } = article;

  if (!exists) {
    return new Article({
      content,
      id,
      title,
      category,
      author,
      estimatedTime,
      image,
    })
      .save()
      .then((res) => {
        return {
          success: true,
          articleID: id,
        };
      })
      .catch((err) => {
        return {
          success: false,
          err,
        };
      });
  } else if (exists) {
    return Article.findOneAndUpdate(
      { id },
      { content, title, category, author, estimatedTime }
    )
      .then((res) => {
        return {
          success: true,
          articleID: id,
        };
      })
      .catch((err) => {
        return {
          success: false,
          err,
        };
      });
  }
};

export const deleteArticle = async (id: IArticle['id']) => {
  const res = await Article.findOneAndDelete({ id })
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

  return res;
};

// Find an article via its ID
export const findArticle = async (id: IArticle['id']): Promise<IArticle> => {
  const article = await Article.findOne({ id });

  return article!;
};

// Get all articles
export const getArticles = async () => {
  const res = await Article.find();

  return res;
};
