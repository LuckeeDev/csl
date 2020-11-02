import { Component, OnInit } from '@angular/core';
import { IArticle } from '@global/@types/articles';
import { ArticlesService } from '@global/services/articles/articles.service';
import { DialogService } from '@global/ui/services/dialog/dialog.service';
import { ToastrService } from '@global/ui/services/toastr/toastr.service';

@Component({
  selector: 'app-manage-articles',
  templateUrl: './manage-articles.component.html',
  styleUrls: ['./manage-articles.component.scss'],
})
export class ManageArticlesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'options'];

  articles: IArticle[];

  constructor(
    public articlesService: ArticlesService,
    private dialog: DialogService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.articlesService.getArticles().subscribe((articles) => {
      this.articles = articles;
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
      .subscribe((res) => {
        this.articlesService.delete(id).subscribe((res) => {
          if (res.success === true) {
            this.toastr.show({
              message: 'Articolo eliminato',
              action: 'Chiudi',
              duration: 5000,
            });

            this.articlesService.getArticles().subscribe((articles) => {
              this.articles = articles;
            });
          } else if (res.success === false) {
            this.toastr.showError();
          }
        });
      });
  }
}
