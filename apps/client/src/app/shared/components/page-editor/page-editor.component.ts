import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommissioniService } from '@global/services/commissioni/commissioni.service';

import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import List from '@editorjs/list';
import Image from '@editorjs/image';

import { ICommissione } from '@csl/shared';
import { DialogService, ToastrService } from '@csl/ui';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'csl-editor',
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.scss'],
})
export class PageEditorComponent implements AfterViewInit, OnInit {
  editor: EditorJS;

  commissione: string;

  constructor(
    private commissioni: CommissioniService,
    private dialog: DialogService,
    private toastr: ToastrService,
    private activated: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.commissione = this.activated.snapshot.paramMap.get('commissione');
    console.log(this.commissione);
  }

  ngAfterViewInit(): void {
    this.commissioni.getPage(this.commissione).subscribe((res) => {
      const data = res.data;

      this.editor = new EditorJS({
        holder: 'editorjs',

        data: data.page ? data.page : null,

        tools: {
          header: {
            class: Header,
            shortcut: 'CTRL+ALT+T',
            inlineToolbar: true,
            config: {
              placeholder: 'Titolo',
              levels: [1, 2, 3],
              defaultLevel: 1,
            },
          },
          paragraph: {
            class: Paragraph,
            shortcut: 'CTRL+ALT+Q',
            inlineToolbar: true,
            config: {
              placeholder: 'Paragrafo',
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
            shortcut: 'CTRL+ALT+W',
          },
          image: {
            class: Image,
            shortcut: 'CTRL+ALT+I',
            inlineToolbar: true,
            config: {
              endpoints: {
                byFile: `/api/commissioni/image`,
              },
            },
          },
        },

        i18n: {
          messages: {
            toolNames: {
              Text: 'Paragrafo',
              Heading: 'Titolo',
              List: 'Elenco',
              Image: 'Immagine',
              Bold: 'Grassetto',
              Italic: 'Corsivo',
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

        defaultBlock: 'paragraph',

        autofocus: true,
      });
    });
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
          this.commissioni.savePage(page).subscribe((res) => {
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
