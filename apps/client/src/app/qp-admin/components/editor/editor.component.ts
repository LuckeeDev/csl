import { AfterViewInit, Component, OnInit } from '@angular/core';

import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import List from '@editorjs/list';
import Image from '@editorjs/image';
import HyperLink from 'editorjs-hyperlink';

// @ts-ignore
import { ArticlesService } from '@global/services/articles/articles.service';
import { DialogService, ToastrService } from '@csl/ui';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { IArticle } from '@csl/shared';
import { AngularFireStorage } from '@angular/fire/storage';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'csl-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit, AfterViewInit {
  editor: EditorJS;

  ready: boolean;
  articleID: string;

  categories: IArticle['category'][];

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
    private fb: FormBuilder,
    private afs: AngularFireStorage,
  ) {
    this.ready = false;
    this.articleID = this.route.snapshot.paramMap.get('articleID');
    this.categories = [
      'Lussana',
      'Italia',
      'Mondo',
      'Speciale',
      'Scienza & Tech',
      'Cultura',
      'Sport',
      'Svago',
    ];
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
            inlineToolbar: ['bold', 'italic', 'hyperlink'],
            config: {
              placeholder: 'Titolo',
              levels: [1, 2, 3],
              defaultLevel: 1,
            },
          },
          paragraph: {
            class: Paragraph,
            shortcut: 'CTRL+ALT+Q',
            inlineToolbar: ['bold', 'italic', 'hyperlink'],
            config: {
              placeholder: 'Testo',
            },
          },
          list: {
            class: List,
            shortcut: 'CTRL+ALT+W',
            inlineToolbar: ['bold', 'italic', 'hyperlink'],
          },
          image: {
            class: Image,
            shortcut: 'CTRL+ALT+I',
            inlineToolbar: ['bold', 'italic', 'hyperlink'],
            config: {
              endpoints: {
                byFile: `${environment.api}/articles/image`,
              },
            },
          },
          hyperlink: {
            class: HyperLink,
            config: {
              availableTargets: ['_blank', '_self'],
              availableRels: ['external'],
              target: '_blank',
              rel: 'external',
            },
          },
        },

        defaultBlock: 'paragraph',

        i18n: {
          messages: {
            toolNames: {
              Text: 'Paragrafo',
              Heading: 'Titolo',
              List: 'Elenco',
              Image: 'Immagine',
              Bold: 'Grassetto',
              Italic: 'Corsivo',
              Hyperlink: 'Link',
            },
            tools: {
              list: {
                Ordered: 'Numerato',
                Unordered: 'Non numerato',
              },
              image: {
                'Select an Image': "Carica un'immagine",
                'With border': 'Con bordo',
                'Stretch image': 'Allarga immagine',
                'With background': 'Con sfondo',
              },
              link: {
                'Add a link': 'Aggiungi un link',
              },
              hyperlink: {
                Save: 'Salva',
                'Select target': 'Seleziona destinazione',
                'Select rel': 'Seleziona relazione',
              },
            },
            blockTunes: {
              delete: { Delete: 'Elimina' },
              moveUp: { 'Move up': 'Sposta su' },
              moveDown: { 'Move down': 'Sposta giù' },
            },
            ui: {
              blockTunes: {
                toggler: {
                  'Click to tune': 'Modifica',
                },
              },
              inlineToolbar: {
                converter: {
                  'Convert to': 'Converti in',
                },
              },
              toolbar: {
                toolbox: {
                  Add: 'Aggiungi',
                },
              },
            },
          },
        },

        autofocus: true,

        onReady: () => {
          this.ready = true;
        },
      });
    });
  }

  get originalImageName(): string {
    const imageName: string = this.metadata.value.image;
    const nameArray = imageName.split('_');
    nameArray.shift();

    return nameArray.join('_');
  }

  save() {
    this.dialog
      .open({
        title: "Salvare l'articolo?",
        text: 'Potrai comunque modificarlo in seguito',
        answer: 'Sì, salva',
        color: 'primary',
      })
      .subscribe(() => {
        this.editor.save().then((content) => {
          this.articlesService
            .save(content, this.metadata.value, this.articleID)
            .subscribe((res) => {
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
      .subscribe(() => {
        if (!this.articleID) {
          this.editor.clear();
          this.metadata.reset();

          this.toastr.show({
            message: 'Articolo eliminato',
            color: 'basic',
          });

          this.router.navigate(['..', 'qp-admin', 'editor']);
        } else if (this.articleID) {
          this.articlesService.delete(this.articleID).subscribe((res) => {
            if (res.success === true) {
              this.toastr.show({
                message: 'Articolo eliminato',
                color: 'basic',
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

  uploadCover(event): void {
    const cover: File = event.target.files[0];

    const fileName = `${Date.now()}_${cover.name}`;

    this.afs
      .ref(`articles/covers/${fileName}`)
      .put(cover)
      .then(() => {
        this.metadata.controls['image'].setValue(fileName);

        this.toastr.show({
          message: `File caricato`,
          color: 'basic',
          action: 'Chiudi',
          duration: 5000,
        });
      })
      .catch(() => {
        this.toastr.showError();
      });
  }
}
