import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesRoutingModule } from './articles-routing.module';
import { CoreModule } from '@/core/core.module';
import { UiModule } from '@csl/ui';
import { NgxsModule } from '@ngxs/store';
import { PipesModule } from '@/global/pipes/pipes.module';

// State
import { ArticlesService } from './services/articles/articles.service';
import { ArticlesState } from './store/articles.state';

// Views
import { ArticlesHomeView } from './views/articles-home/articles-home.view';
import { ArticlesView } from './articles.view';
import { ArticleView } from './views/article/article.view';

@NgModule({
	declarations: [ArticlesView, ArticlesHomeView, ArticleView],
	imports: [
		CommonModule,
		ArticlesRoutingModule,
		CoreModule,
		UiModule,
		NgxsModule.forFeature([ArticlesState]),
		PipesModule,
	],
	providers: [ArticlesService]
})
export class ArticlesModule {}
