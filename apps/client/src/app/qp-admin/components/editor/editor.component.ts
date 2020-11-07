import { AfterViewInit, Component, OnInit } from '@angular/core';

import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import List from '@editorjs/list';
import Image from '@editorjs/image';

import { ArticlesService } from '@global/services/articles/articles.service';
import { DialogService, ToastrService } from '@csl/ui';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit, AfterViewInit {
  editor: EditorJS;

  ready: boolean;
  saving: boolean;
  articleID: string;

  categories: string[];

  coverURL: string;

  metadata = this.fb.group({
    category: ['', Validators.required],
    title: ['', Validators.required],
    author: ['', Validators.required],
    estimatedTime: ['', Validators.required],
    image: ['', Validators.required],
  });

  constructor(
    public articlesService: ArticlesService,
    private dialog: DialogService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.ready = false;
    this.articleID = this.route.snapshot.paramMap.get('articleID');
    this.categories = ['Musica', 'Cultura', 'Cinema', 'Lussana', 'Sport'];
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.articlesService.getArticle(this.articleID).subscribe((res) => {
      const article = res.data;

      if (article) {
        this.metadata.controls['category'].setValue(article.category);
        this.metadata.controls['title'].setValue(article.title);
        this.metadata.controls['author'].setValue(article.author);
        this.metadata.controls['estimatedTime'].setValue(article.estimatedTime);
        this.metadata.controls['image'].setValue(article.image);
      }

      this.editor = new EditorJS({
        holder: 'editorjs',

        data: article ? article.content : null,

        tools: {
          header: {
            class: Header,
            shortcut: 'CTRL+ALT+T',
            config: {
              placeholder: 'Titolo',
              levels: [1, 2, 3],
              defaultLevel: 1,
            },
          },
          paragraph: {
            class: Paragraph,
            shortcut: 'CTRL+ALT+Q',
            config: {
              placeholder: 'Testo',
            },
          },
          list: {
            class: List,
            shortcut: 'CTRL+ALT+W',
          },
          image: {
            class: Image,
            shortcut: 'CTRL+ALT+I',
            config: {
              endpoints: {
                byFile: `/api/articles/image`,
              },
            },
          },
        },

        initialBlock: 'paragraph',

        autofocus: true,

        onReady: () => {
          this.ready = true;
        },
      });
    });
  }

  save() {
    this.dialog
      .open({
        title: "Salvare l'articolo?",
        text: 'Potrai comunque modificarlo in seguito',
        answer: 'Sì, salva',
        color: 'primary',
      })
      .subscribe((res) => {
        this.editor.save().then((content) => {
          this.saving = true;

          this.articlesService
            .save(content, this.metadata.value, this.articleID)
            .subscribe((res) => {
              this.saving = false;

              if (res.success === true) {
                this.toastr.show({
                  message: 'Articolo salvato!',
                  color: 'success',
                  action: 'Chiudi',
                  duration: 5000,
                });

                if (!this.articleID) {
                  this.router.navigate(['editor', res.data.articleID], {
                    relativeTo: this.route.parent,
                  });
                }
              } else if (res.success === false) {
                this.toastr.showError();
              }
            });
        });
      });
  }

  delete() {
    this.dialog
      .open({
        title: "Cancellare l'articolo?",
        answer: 'Sì, cancella',
        text: 'Non potrai più recuperarlo',
        color: 'warn',
      })
      .subscribe((res) => {
        if (!this.articleID) {
          this.editor.clear();
          this.metadata.reset();

          this.toastr.show({
            message: 'Articolo eliminato',
            color: 'primary',
          });

          this.router.navigate(['..', 'qp-admin', 'editor'])
        } else if (this.articleID) {
          this.articlesService.delete(this.articleID).subscribe((res) => {
            if (res.success === true) {
              this.toastr.show({
                message: 'Articolo eliminato',
                color: 'accent',
                action: 'Chiudi',
                duration: 5000,
              });

              this.router.navigate(['qp-admin', 'editor']);
            } else if (res.success === false) {
              this.toastr.showError();
            }
          });
        }
      });
  }

  uploadCover(event) {
    this.ready = false;

    const cover: File = event.target.files[0];

    this.articlesService
      .uploadCover(cover)
      .then(async (res) => {
        this.ready = true;
        this.metadata.controls['image'].setValue(res.metadata.name);

        this.toastr.show({
          message: `File caricato`,
          color: 'primary',
          action: 'Chiudi',
          duration: 5000,
        });
      })
      .catch((err) => {
        this.ready = true;
        this.toastr.showError();
      });
  }
}
