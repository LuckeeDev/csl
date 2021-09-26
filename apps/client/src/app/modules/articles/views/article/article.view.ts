import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from '@global/services/articles/articles.service';
import { IArticle } from '@csl/shared';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
	selector: 'csl-article',
	templateUrl: './article.view.html',
	styleUrls: ['./article.view.scss'],
})
export class ArticleView implements OnInit {
	articleID: string;
	article: IArticle;

	constructor(
		private activated: ActivatedRoute,
		private articles: ArticlesService,
		private afs: AngularFireStorage
	) {
		this.articleID = this.activated.snapshot.paramMap.get('articleID');
	}

	// Get article content on component initialization
	ngOnInit() {
		this.articles.getArticle(this.articleID).subscribe((res) => {
			this.article = res.data;

			this.article.content.blocks.map(async (block) => {
				if (block.type === 'image') {
					block.data.file.firebaseURL = await this.afs
						.ref(`${block.data.file.firebasePath}`)
						.getDownloadURL()
						.toPromise();
					return block;
				} else {
					return block;
				}
			});
		});
	}
}
