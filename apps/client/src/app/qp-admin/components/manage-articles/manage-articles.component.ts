import { Component, OnInit } from '@angular/core';
import { IArticle } from '@csl/shared';
// @ts-ignore
import { ArticlesService } from '@global/services/articles/articles.service';
import { DialogService, ToastrService } from '@csl/ui';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'csl-manage-articles',
  templateUrl: './manage-articles.component.html',
  styleUrls: ['./manage-articles.component.scss'],
})
export class ManageArticlesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'options', 'published'];

  articles: IArticle[];

  constructor(
    public articlesService: ArticlesService,
    private dialog: DialogService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.articlesService.getArticles().subscribe((res) => {
      this.articles = res.data;
    });
  }

  deleteArticle(id: IArticle['id']) {
    this.dialog
      .open({
        title: "Cancellare l'articolo?",
        answer: 'Sì, cancella',
        text: 'Non potrai più recuperarlo',
        color: 'warn',
      })
      .subscribe(() => {
        this.articlesService.delete(id).subscribe((res) => {
          if (res.success === true) {
            this.toastr.show({
              message: 'Articolo eliminato',
              color: 'basic',
              action: 'Chiudi',
              duration: 5000,
            });

            this.articlesService.getArticles().subscribe((articles) => {
              this.articles = articles.data;
            });
          } else if (res.success === false) {
            this.toastr.showError();
          }
        });
      });
  }

  publishedChange(event: MatSlideToggleChange, id: IArticle['id']) {
    this.articlesService
      .changeArticlePublished(id, event.checked)
      .subscribe((res) => {
        if (res.success) {
          this.toastr.show({
            color: 'basic',
            message: "Stato dell'articolo modificato con successo",
          });
        } else {
          this.toastr.showError();
        }
      });
  }
}
