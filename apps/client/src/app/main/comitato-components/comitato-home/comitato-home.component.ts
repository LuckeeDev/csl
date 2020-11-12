import { Component, OnInit } from '@angular/core';
import { CommissioniService } from '@global/services/commissioni/commissioni.service';
import { Observable } from 'rxjs';
import { ICommissione } from '@csl/shared';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'csl-comitato-home',
  templateUrl: './comitato-home.component.html',
  styleUrls: ['./comitato-home.component.scss'],
})
export class ComitatoHomeComponent implements OnInit {
  comitato$: Observable<ICommissione>;

  constructor(
    private commissioni: CommissioniService,
    private afs: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.comitato$ = this.commissioni.getPage('comitato').pipe(
      map((res) => res.data),
      map((comitato) => {
        comitato.page.blocks.map(async (block) => {
          if (block.type === 'image') {
            block.data.file.firebaseURL = await this.afs
              .ref(`${block.data.file.firebasePath}`)
              .getDownloadURL()
              .toPromise();

            return block;
          } else {
            return block;
          }
        });

        return comitato;
      })
    );
  }
}
