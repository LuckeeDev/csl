import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IArticle } from '@global/@types/articles';
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

  // Save a new article
  save(
    content: OutputData,
    form: IArticleForm,
    articleID?: IArticle['id']
  ): Observable<any> {
    const { author, category, title, estimatedTime, image } = form;
    const id = articleID ?? title!.toLowerCase().replace(/ /g, '-');

    const article = {
      content,
      author,
      category,
      title,
      estimatedTime,
      image
    };

    return this.http.post(`/api/articles/${id}`, { article });
  }

  uploadCover(file: File) {
    const ref = this.afs.ref(`articles/covers/${Date.now()}_${file.name}`);
    return ref.put(file);
  }

  // Delete an article
  delete(id: IArticle['id']): Observable<any> {
    return this.http.delete(`/api/articles/${id}`);
  }

  // Get an article based on its ID
  getArticle(id: string): Observable<IArticle> {
    return this.http.get<IArticle>(`/api/articles/find/${id}`);
  }

  // Get all articles
  getArticles(): Observable<IArticle[]> {
    return this.http.get<IArticle[]>('/api/articles');
  }
}
