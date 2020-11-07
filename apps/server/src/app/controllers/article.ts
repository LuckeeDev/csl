import mongoose, { Schema } from 'mongoose';
import { IArticleModel, IArticle, IHttpRes } from '@csl/shared';

const ArticleSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: Object, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    estimatedTime: { type: Number },
    image: { type: String },
    date: { type: Date },
  },
  { skipVersioning: true }
);

export const Article = mongoose.model<IArticleModel>('article', ArticleSchema);

export const getArticles = async (): Promise<IHttpRes<IArticle[]>> => {
  return Article.find()
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

export const getArticle = async (
  id: IArticle['id']
): Promise<IHttpRes<IArticle>> => {
  return Article.findOne({ id })
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

// Save a new article
export const saveArticle = async (
  article: IArticle,
  id: IArticle['id']
): Promise<IHttpRes<any>> => {
  const exists = (await Article.findOne({ id })) ? true : false;

  const { title, category, author, estimatedTime, content, image } = article;

  if (!exists) {
    const date = new Date();

    return new Article({
      content,
      id,
      title,
      category,
      author,
      estimatedTime,
      image,
      date,
    })
      .save()
      .then((res) => {
        return {
          success: true,
          data: {
            articleID: id,
          },
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
          data: {
            articleID: id,
          },
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

export const deleteArticle = async (id: IArticle['id']): Promise<IHttpRes<any>> => {
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
