import { AfterViewInit, Component } from '@angular/core';
import { CommissioniService } from '@global/services/commissioni/commissioni.service';

import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import List from '@editorjs/list';
import Image from '@editorjs/image';

@Component({
  selector: 'csl-editor',
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.scss'],
})
export class PageEditorComponent implements AfterViewInit {
  editor: EditorJS;

  constructor(private commissioni: CommissioniService) {}

  ngAfterViewInit(): void {
    this.commissioni.getPage().subscribe((res) => {
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
                byFile: `/api/articles/image`,
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
    console.log('saved');
  }
}
