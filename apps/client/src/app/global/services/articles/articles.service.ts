import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IArticle, IHttpRes } from '@csl/shared';
import { OutputData } from '@editorjs/editorjs';
import { AngularFireStorage } from '@angular/fire/storage';

interface IArticleForm {
  author: string;
  category: string;
  title: string;
  estimatedTime: number;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private http: HttpClient, private afs: AngularFireStorage) {}

  getArticles(): Observable<IHttpRes<IArticle[]>> {
    return this.http.get<IHttpRes<IArticle[]>>('/articles');
  }

  getArticle(id: string): Observable<IHttpRes<IArticle>> {
    return this.http.get<IHttpRes<IArticle>>(`/articles/${id}`);
  }

  save(
    content: OutputData,
    form: IArticleForm,
    articleID?: IArticle['id']
  ): Observable<IHttpRes<any>> {
    const { author, category, title, estimatedTime, image } = form;
    const id = articleID ?? title.toLowerCase().replace(/ /g, '-');

    const article = {
      content,
      author,
      category,
      title,
      estimatedTime,
      image,
    };

    return this.http.post<IHttpRes<any>>(`/articles/${id}`, { article });
  }

  delete(id: IArticle['id']): Observable<IHttpRes<any>> {
    return this.http.delete<IHttpRes<any>>(`/articles/${id}`);
  }

  changeArticlePublished(
    id: IArticle['id'],
    state: IArticle['published']
  ): Observable<IHttpRes<any>> {
    return this.http.patch<IHttpRes<any>>(`/articles/${id}/state`, {
      state,
    });
  }
}
