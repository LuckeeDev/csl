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
  styleUrls: ['./page-editor.component.scss']
})
export class PageEditorComponent implements AfterViewInit {
  editor: EditorJS;

  constructor(private commissioni: CommissioniService) { }

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
      });
    });
  }

  save() {
    console.log('saved');
  }
}
