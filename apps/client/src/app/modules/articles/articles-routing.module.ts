import { LoggedInGuard } from '@/global/guards/logged-in/logged-in.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesView } from './articles.view';
import { ArticleView } from './views/article/article.view';
import { ArticlesHomeView } from './views/articles-home/articles-home.view';

const routes: Routes = [
	{
		path: '',
		canActivate: [LoggedInGuard],
		component: ArticlesView,
		children: [
			{ path: '', component: ArticlesHomeView },
			{ path: ':articleID', component: ArticleView },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ArticlesRoutingModule {}
