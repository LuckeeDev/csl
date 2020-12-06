import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommissioniService } from '@global/services/commissioni/commissioni.service';

import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import List from '@editorjs/list';
import Image from '@editorjs/image';
import HyperLink from 'editorjs-hyperlink';

import { ICommissione } from '@csl/shared';
import { DialogService, ToastrService } from '@csl/ui';
import { AuthService } from '@global/services/auth/auth.service';
import { map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'csl-editor',
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.scss'],
})
export class PageEditorComponent implements AfterViewInit, OnInit {
  editor: EditorJS;

  id: ICommissione['id'];
  commissione: ICommissione;

  displayedColumns: string[] = ['name', 'manage'];

  getDisplayName(file: string): string {
    const nameArray = file.split('_');
    nameArray.shift();

    return nameArray.join('_');
  }

  constructor(
    private commissioni: CommissioniService,
    private dialog: DialogService,
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.auth.user$
      .pipe(
        map((user) => {
          if (this.router.url.includes('rappre') && user.isRappre) {
            return 'comitato';
          } else if (this.router.url.includes('referente')) {
            return user.isReferente;
          }
        }),
        switchMap((commissione) => {
          this.id = commissione;

          return this.commissioni.getPage(this.id);
        })
      )
      .subscribe((res) => {
        this.commissione = res.data;

        this.editor = new EditorJS({
          holder: 'editorjs',

          data: this.commissione.page ? this.commissione.page : null,

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
                  byFile: `/api/commissioni/${this.id}/image`,
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
        });
      });
  }

  uploadPDF(e) {
    const pdf = e.target.files[0];

    this.commissioni.uploadPDF(pdf, this.id).subscribe((res) => {
      if (res.success) {
        this.commissione.files = res.data;

        this.toastr.show({
          color: 'basic',
          message: 'PDF caricato con successo'
        });
      } else {
        this.toastr.showError();
      }
    });
  }

  deletePDF(file: string) {
    this.dialog.open({
      title: `Eliminare il file?`,
      text: 'Questa azione non potrà più essere annullata',
      answer: 'Sì, elimina',
      color: 'warn'
    }).pipe(
      switchMap(() => this.commissioni.deletePDF(file, this.id))
    ).subscribe((res) => {
      if (res.success) {
        this.commissione.files = res.data;

        this.toastr.show({
          color: 'basic',
          message: `File rimosso con successo`,
        });
      } else {
        this.toastr.showError();
      }
    })
  }

  save() {
    this.dialog
      .open({
        title: 'Salvare pagina?',
        text: 'Potrai tornare quando vorrai per modificarla',
        answer: 'Salva',
        color: 'primary',
      })
      .subscribe(() => {
        this.editor.save().then((page: ICommissione['page']) => {
          this.commissioni.savePage(this.id, page).subscribe((res) => {
            if (res.success) {
              this.toastr.show({
                color: 'success',
                message: 'Pagina salvata',
              });
            } else {
              this.toastr.showError();
            }
          });
        });
      });
  }
}
