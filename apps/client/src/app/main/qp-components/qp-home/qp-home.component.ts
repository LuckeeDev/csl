import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl } from '@angular/forms';
import { IArticle } from '@global/@types/articles';
import { ArticlesService } from '@global/services/articles/articles.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-qp-home',
  templateUrl: './qp-home.component.html',
  styleUrls: ['./qp-home.component.scss'],
})
export class QpHomeComponent implements OnInit {
  articles: IArticle[];
  imageReady: boolean;

  search = new FormControl('');

  filteredArticles$: Observable<IArticle[]>;

  constructor(
    public articlesService: ArticlesService,
    private afs: AngularFireStorage
  ) {
    this.filteredArticles$ = this.search.valueChanges.pipe(
      map((value: string | null) => {
        if (value) {
          const filterValue = value.toLowerCase();

          return this.articles.filter(
            (x) =>
              x.title.toLowerCase().includes(filterValue) ||
              x.category.toLowerCase().includes(filterValue)
          );
        } else {
          return this.articles.slice();
        }
      })
    );
  }

  ngOnInit(): void {
    this.articlesService.getArticles().subscribe((articles) => {
      this.articles = articles;

      this.articles.forEach((article) => {
        article.preview = article.content.blocks.find(
          (block) => block.type === 'paragraph'
        ).data.text;
      });

      this.articles.forEach((article) => {
        this.afs
          .ref(`articles/covers/${article.image}`)
          .getDownloadURL()
          .subscribe((link) => {
            this.imageReady = true;
            article.image = link;
          });
      });
    });
  }
}
