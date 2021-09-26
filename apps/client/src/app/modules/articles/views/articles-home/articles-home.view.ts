import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl } from '@angular/forms';
import { IArticle } from '@csl/shared';
import { ArticlesService } from '@global/services/articles/articles.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'csl-articles-home',
	templateUrl: './articles-home.view.html',
	styleUrls: ['./articles-home.view.scss'],
})
export class ArticlesHomeView implements OnInit {
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
							x.category.toLowerCase().includes(filterValue) ||
							x.preview.toLowerCase().includes(filterValue)
					);
				} else {
					return this.articles.slice();
				}
			})
		);
	}

	ngOnInit(): void {
		this.articlesService
			.getArticles()
			.pipe(
				map((res) =>
					res.data
						.filter((article) => article.published === true)
						// Reverse to get articles in chronologic order
						.reverse()
				)
			)
			.subscribe((articles) => {
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
