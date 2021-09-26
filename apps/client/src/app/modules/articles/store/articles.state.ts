import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { ArticlesService } from '../services/articles/articles.service';
import { Articles } from './articles.actions';
import { ArticlesStateModel } from './articles.model';

@State<ArticlesStateModel>({
	name: 'articles',
	defaults: {
		articles: [],
		loading: false,
	},
})
@Injectable()
export class ArticlesState {
	@Selector()
	static articles(state: ArticlesStateModel) {
		return state.articles;
	}

	constructor(private articles: ArticlesService) {}

	@Action(Articles.GetAll)
	getAllArticles(ctx: StateContext<ArticlesStateModel>) {
		ctx.patchState({ loading: true });

		return this.articles
			.getAllArticles()
			.pipe(tap((articles) => ctx.setState({ articles, loading: false })));
	}
}
